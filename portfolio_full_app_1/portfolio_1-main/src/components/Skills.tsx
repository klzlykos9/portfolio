import React from 'react';

const Skills: React.FC = () => {
  const businessSkills = [
    'Six Sigma',
    'Lean Manufacturing Methodology',
    'Quality Assurance',
    'Supply Chain',
    'Lean Leadership',
    'Planning and Forecasting',
    'Management',
    'Lean Six Sigma Green Belt',
    'Lean Six Sigma Black Belt',
    'International Business',
    'Finance & Operations',
    'Logistics Management',
    'Financial Analysis'
  ];

  const technicalSkills = [
    'MS OFFICE',
    'PYTHON',
    'R Studio',
    'SPSS',
    'Minitab',
    'Power BI'
  ];

  const languageSkills = [
    'C',
    'C++',
    'Java',
    'Python'
  ];

  const frontendSkills = [
    'React',
    'JavaScript',
    'HTML',
    'HTML5',
    'CSS',
    'CSS3',
    'Tailwind CSS'
  ];

  const backendSkills = [
    'Node.js',
    'Express',
    'MongoDB',
    'SQL'
  ];

  const aiSkills = [
    'Python',
    'Git',
    'Machine Learning',
    'Deep Learning',
    'Reinforcement Learning',
    'LangChain',
    'LangGraph',
    'LangSmith',
    'Aron',
    'n8n',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Natural Language Processing',
    'Computer Vision',
    'MLOps',
    'Hugging Face'
  ];

  return (
    <section id="skills" className="w-full min-h-screen text-gray-300 bg-[#0a192f] py-10 sm:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 flex flex-col justify-center w-full">
        <div>
          <p className="text-2xl sm:text-4xl font-bold inline border-b-4 border-pink-600">Skills</p>
          <p className="py-4 text-sm sm:text-base">My professional expertise and technical capabilities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 py-8">
          {/* Business Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Business Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {businessSkills.map((skill, index) => (
                <div
                  key={index}
                  className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 p-2 sm:p-4 text-center text-xs sm:text-sm bg-[#1a1a1a] rounded"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 p-2 sm:p-4 text-center text-xs sm:text-sm bg-[#1a1a1a] rounded"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Programming Languages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {languageSkills.map((skill, index) => (
                <div
                  key={index}
                  className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 p-2 sm:p-4 text-center text-xs sm:text-sm bg-[#1a1a1a] rounded"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend Development */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Frontend Development</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {frontendSkills.map((skill, index) => (
                <div
                  key={index}
                  className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 p-2 sm:p-4 text-center text-xs sm:text-sm bg-[#1a1a1a] rounded"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Development */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Backend Development</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {backendSkills.map((skill, index) => (
                <div
                  key={index}
                  className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 p-2 sm:p-4 text-center text-xs sm:text-sm bg-[#1a1a1a] rounded"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI & Data Science Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">AI & Data Science Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {aiSkills.map((skill, index) => (
                <div
                  key={index}
                  className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 p-2 sm:p-4 text-center text-xs sm:text-sm bg-[#1a1a1a] rounded"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Work Experience</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-pink-600 pl-4">
              <h4 className="text-lg sm:text-xl font-semibold">Sales Team Leader</h4>
              <p className="text-gray-400 text-sm sm:text-base">The Inspireez IT Solution (Bhubaneswar) | 2015-2017</p>
              <p className="text-sm sm:text-base">In charge of managing sales team's day to day interaction with international clients.</p>
            </div>
            <div className="border-l-4 border-pink-600 pl-4">
              <h4 className="text-lg sm:text-xl font-semibold">Senior Associate</h4>
              <p className="text-gray-400 text-sm sm:text-base">Shinux.com | 2014-2015</p>
              <p className="text-sm sm:text-base">Interact with customers through various social media & other platforms to sell company's service.</p>
            </div>
          </div>
        </div>

        {/* Internship */}
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">Internship</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-pink-600 pl-4">
              <h4 className="text-lg sm:text-xl font-semibold">Lean Six Sigma Intern</h4>
              <p className="text-gray-400 text-sm sm:text-base">Henry Harvin | 2022</p>
              <p className="text-sm sm:text-base">Completed 2 Internship Projects (Duration 4 Month) on Lean Six Sigma.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;


