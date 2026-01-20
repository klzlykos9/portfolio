import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Proxy to Python AI Agent
  app.post('/api/chat', async (req, res) => {
    try {
      const response = await axios.post('http://0.0.0.0:8000/api/chat', req.body);
      res.json(response.data);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ response: "I'm having trouble connecting to my neural network. (Backend unavailable)" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
