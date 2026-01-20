import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full min-h-screen flex items-start py-10 sm:py-20 bg-[#0a192f] text-gray-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col gap-8 sm:gap-16 w-full">

        {/* Section Title */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="sm:text-right pb-8">
            <p className="text-2xl sm:text-4xl font-bold inline border-b-4 border-pink-600">About Me</p>
          </div>
          <div></div>
        </div>

        {/* 🧠 About Me with blurred background */}
        <div className="relative w-full max-w-[900px] mx-auto p-4 sm:p-8 rounded-lg shadow-lg">
          {/* Background Image with blur */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-md opacity-40 rounded-lg"
            style={{ backgroundImage: "url('https://d3nwecxvwq3b5n.cloudfront.net/AcuCustom/Sitename/DAM/047/ai_generated_code1_Main.jpg')" }}
          ></div>

          {/* Text content with white semi-transparent background */}
          <div className="relative z-10 bg-white/70 backdrop-blur-md p-4 sm:p-6 rounded-lg text-black">
            <h3 className="text-xl sm:text-2xl font-semibold text-pink-600 mb-4">More About Me and My Background</h3>
            <p className="leading-relaxed text-sm sm:text-base">
              My journey into the world of artificial intelligence began unexpectedly during my MBA studies, when I opted to take the{' '}
              <span className="text-blue-700 font-medium">Certified Python Business Analyst (CPBA)</span> course as a substitute for my internship. That one decision sparked a deep curiosity in data, models, and intelligent systems.
            </p>
            <p className="mt-4 leading-relaxed text-sm sm:text-base">
              After completing my MBA in International Business, I pivoted into the exciting field of AI/ML and haven’t looked back since. I dove into mastering{' '}
              <span className="text-blue-700 font-medium">Machine Learning, Deep Learning, and Reinforcement Learning</span>, developing a strong grip on both theory and implementation.
            </p>
            <p className="mt-4 leading-relaxed text-sm sm:text-base">
              I specialize in building intelligent systems using{' '}
              <span className="text-blue-700 font-medium">Python, TensorFlow, PyTorch, NumPy, and Scikit-learn</span>, with a particular passion for reinforcement learning and optimization algorithms. My work involves creating solutions that are not just technically sound but also scalable and human-centered.
            </p>
            <p className="mt-4 leading-relaxed text-sm sm:text-base">
              Whether it's tuning hyperparameters or deploying real-time ML models, I enjoy pushing boundaries and solving real-world problems with AI. Beyond my core area, I stay deeply involved in emerging AI methodologies and their transformative applications in business strategy. I actively follow advancements in generative in generative AI, foundations models, and evolving neural network achitectures that are reshaping the future of intelligent systems.
            </p>
          </div>
        </div>

        {/* 🎓 Education & Certifications side by side */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Education */}
          <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-pink-600 mb-4">🎓 Education</h3>

            <div className="mb-4">
              <p className="font-bold text-blue-400 text-sm sm:text-base">Masters in Business Administration (International Business)</p>
              <p className="text-sm sm:text-base">Lovely Professional University</p>
              <p className="text-xs sm:text-sm text-gray-400">
                Capstone: "The study and effect of online marketing in today's business environment"
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-400 text-sm sm:text-base">Bachelors in Science (Math Hons)</p>
              
              <p className="text-xs sm:text-sm text-gray-400">
                First Class Hons (Major in Physics & Minor in Chemistry)
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-pink-600 mb-4">📜 Certifications</h3>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
              <li>LEAN SIX SIGMA BLACK BELT – Henry Harvin Educations, 2022</li>
              <li>LEAN SIX SIGMA GREEN BELT – Henry Harvin Educations, 2021</li>
              <li>Certified Python Business Analyst (CPBA) – Henry Harvin Educations, 2020</li>
              <li>Post Graduate Diploma in Computer Applications – NIAT, 2014</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
