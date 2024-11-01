'use client';
import { Bug, Code, Coffee, Cpu, Heart, Laugh, Lightbulb, Music, Pizza, Rocket, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

const funSkills = [
  { 
    name: 'Python Whisperer 🐍', 
    level: 90,
    description: 'Can make snakes dance to my code',
    color: 'from-green-400 to-blue-500'
  },
  { 
    name: 'Java Juggler ☕', 
    level: 85,
    description: 'Keeping multiple threads in the air without dropping any',
    color: 'from-orange-400 to-red-500'
  },
  { 
    name: 'Bug Detective 🔍', 
    level: 88,
    description: 'Finding bugs that hide better than my car keys',
    color: 'from-purple-400 to-pink-500'
  },
  { 
    name: 'Code Architect 🏗️', 
    level: 90,
    description: 'Building systems like Lego, but with more semicolons',
    color: 'from-blue-400 to-indigo-500'
  }
];

const funFacts = [
  {
    icon: <Coffee className="w-5 h-5" />,
    fact: "Converts coffee into code with 99.9% efficiency",
    color: "bg-amber-50 text-amber-700"
  },
  {
    icon: <Bug className="w-5 h-5" />,
    fact: "Bugs see me as their final boss",
    color: "bg-red-50 text-red-700"
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    fact: "My rubber duck has a PhD in debugging",
    color: "bg-yellow-50 text-yellow-700"
  },
  {
    icon: <Laugh className="w-5 h-5" />,
    fact: "I speak fluent sarcasm and Python, not necessarily in that order",
    color: "bg-green-50 text-green-700"
  },
  {
    icon: <Music className="w-5 h-5" />,
    fact: "My code is like my playlist - mostly hits, some occasional bugs",
    color: "bg-purple-50 text-purple-700"
  }
];

const CoffeeLevel = () => {
  const [level, setLevel] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => {
        if (prev <= 20) return 98; // Coffee refill!
        return prev - 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg">
      <Coffee className="w-5 h-5 text-brown-500 mr-2" />
      <span>Coffee Level:</span>
      <div className="w-24 bg-gray-200 rounded-full h-2.5 ml-2">
        <div 
          className="bg-gradient-to-r from-yellow-500 to-red-500 h-2.5 rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="ml-2 font-mono">{level}%</span>
    </div>
  );
};

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          {/* Hero Section */}
          <div className="flex items-center mb-12 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <Terminal className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Rocket className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="ml-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Hey, I'm Tarun! 
                <span className="text-3xl ml-2 animate-wave inline-block">👋</span>
              </h1>
              <p className="text-xl text-gray-600 mt-2 flex items-center">
                Senior Software Engineer by profession
                <Code className="w-5 h-5 ml-2 text-blue-500 animate-pulse" />
              </p>
              <p className="text-lg text-gray-500 mt-1 flex items-center">
                Professional Bug Creator (and occasional fixer)
                <Bug className="w-4 h-4 ml-2 text-red-500 animate-bounce" />
              </p>
            </div>
          </div>

          {/* Status Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <CoffeeLevel />
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
              <Bug className="w-5 h-5 text-red-500 mr-2" />
              <span>Bugs Squashed:</span>
              <span className="ml-2 font-mono text-blue-500 animate-pulse">∞</span>
            </div>
          </div>

          {/* Fun Intro */}
          <div className="prose max-w-none mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-inner">
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to my digital playground! When I'm not engaged in an intense staring contest with my code editor 
                or debugging what I swear was working yesterday, you'll find me writing about tech stuff here! 
                I believe in making complex things simple and simple things automated (because why not?).
              </p>
            </div>
          </div>

          {/* Super Powers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text flex items-center">
              Tech Superpowers
              <Cpu className="w-7 h-7 ml-2 text-blue-500" />
            </h2>
            <div className="grid gap-6">
              {funSkills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="transform transition-all duration-300 hover:scale-102"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className={`bg-gradient-to-r ${skill.color} p-0.5 rounded-xl`}>
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium text-lg">{skill.name}</span>
                        <span className="text-blue-500 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className={`bg-gradient-to-r ${skill.color} rounded-full h-3 transition-all duration-1000`}
                          style={{ 
                            width: hoveredSkill === index ? `${skill.level}%` : '0%'
                          }}
                        />
                      </div>
                      <p className="text-gray-600 text-sm italic">{skill.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text flex items-center">
              Debug Log
              <Terminal className="w-7 h-7 ml-2 text-blue-500" />
            </h2>
            <div className="grid gap-4">
              {funFacts.map((fact, index) => (
                <div 
                  key={index} 
                  className={`${fact.color} p-4 rounded-xl flex items-center transform transition-all duration-300 hover:scale-102 hover:shadow-md`}
                >
                  <div className="mr-4">{fact.icon}</div>
                  <p className="font-medium">{fact.fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-xl shadow-inner">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Let's Create Some Tech Magic! ✨
            </h3>
            <p className="text-gray-700 text-lg">
              Whether you're here to learn about backend wizardry, steal some code (I mean, get inspired), 
              or just enjoy some tech humor – you're in the right place! Just remember: in my code, 
              there are no bugs, only unexpected features! 😉
            </p>
          </div>

          {/* Footer Icons */}
          <div className="flex items-center justify-center space-x-8 mt-12">
            {[
              { icon: <Coffee />, title: "Powered by Coffee", color: "hover:text-amber-500" },
              { icon: <Terminal />, title: "Code is Life", color: "hover:text-green-500" },
              { icon: <Pizza />, title: "Debug Fuel", color: "hover:text-red-500" },
              { icon: <Heart />, title: "Love what I do", color: "hover:text-pink-500" }
            ].map((item, index) => (
              <div
                key={index}
                className={`h-12 w-12 text-gray-400 ${item.color} cursor-pointer transform hover:scale-125 transition-all duration-300`}
                title={item.title}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        .animate-wave {
          animation: wave 1.5s infinite;
        }
      `}</style>
    </div>
  );
}