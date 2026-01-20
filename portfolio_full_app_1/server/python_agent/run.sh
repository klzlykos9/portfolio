#!/bin/bash
# Find libstdc++.so.6
LIBSTDCPP=$(gcc --print-file-name=libstdc++.so.6)
LIBDIR=$(dirname "$LIBSTDCPP")
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:$LIBDIR"

# Run Python server
python3 server/python_agent/main.py
