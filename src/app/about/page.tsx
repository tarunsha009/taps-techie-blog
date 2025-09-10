'use client';
import { useTheme } from '@/components/theme/ThemeProvider';
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
        color: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
    },
    {
        icon: <Bug className="w-5 h-5" />,
        fact: "Bugs see me as their final boss",
        color: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
    },
    {
        icon: <Lightbulb className="w-5 h-5" />,
        fact: "My rubber duck has a PhD in debugging",
        color: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
    },
    {
        icon: <Laugh className="w-5 h-5" />,
        fact: "I speak fluent sarcasm and Python, not necessarily in that order",
        color: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
    },
    {
        icon: <Music className="w-5 h-5" />,
        fact: "My code is like my playlist - mostly hits, some occasional bugs",
        color: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
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
        <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3 rounded-lg transition-colors duration-300">
            <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">Coffee Level:</span>
            <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 ml-2">
                <div
                    className="bg-gradient-to-r from-yellow-500 to-red-500 h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${level}%` }}
                />
            </div>
            <span className="ml-2 font-mono text-gray-700 dark:text-gray-300">{level}%</span>
        </div>
    );
};

export default function About() {
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
    const { theme } = useTheme();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-colors duration-300">
                    {/* Hero Section */}
                    <div className="flex items-center mb-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl transition-colors duration-300">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                                <Terminal className="w-16 h-16 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="ml-8">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                                Hey, I'm Tarun!
                                <span className="text-3xl ml-2 animate-wave inline-block">👋</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 flex items-center transition-colors duration-300">
                                Senior Software Engineer by profession
                                <Code className="w-5 h-5 ml-2 text-blue-500 dark:text-blue-400 animate-pulse" />
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 mt-1 flex items-center transition-colors duration-300">
                                Professional Bug Creator (and occasional fixer)
                                <Bug className="w-4 h-4 ml-2 text-red-500 dark:text-red-400 animate-bounce" />
                            </p>
                        </div>
                    </div>

                    {/* Status Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <CoffeeLevel />
                        <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg transition-colors duration-300">
                            <Bug className="w-5 h-5 text-red-500 dark:text-red-400 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">Bugs Squashed:</span>
                            <span className="ml-2 font-mono text-blue-500 dark:text-blue-400 animate-pulse">∞</span>
                        </div>
                    </div>

                    {/* Fun Intro */}
                    <div className="prose max-w-none mb-12">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-inner transition-colors duration-300">
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                                Welcome to my digital playground! When I'm not engaged in an intense staring contest with my code editor
                                or debugging what I swear was working yesterday, you'll find me writing about tech stuff here!
                                I believe in making complex things simple and simple things automated (because why not?).
                            </p>
                        </div>
                    </div>

                    {/* Super Powers */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Tech Superpowers
                            <Cpu className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
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
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl transition-colors duration-300">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-gray-700 dark:text-gray-200 font-medium text-lg transition-colors duration-300">{skill.name}</span>
                                                <span className="text-blue-500 dark:text-blue-400 font-bold">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
                                                <div
                                                    className={`bg-gradient-to-r ${skill.color} rounded-full h-3 transition-all duration-1000`}
                                                    style={{
                                                        width: hoveredSkill === index ? `${skill.level}%` : '0%'
                                                    }}
                                                />
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm italic transition-colors duration-300">{skill.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Debug Log
                            <Terminal className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
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
                    <div className="text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl shadow-inner transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                            Let's Create Some Tech Magic! ✨
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300">
                            Whether you're here to learn about backend wizardry, steal some code (I mean, get inspired),
                            or just enjoy some tech humor – you're in the right place! Just remember: in my code,
                            there are no bugs, only unexpected features! 😉
                        </p>
                    </div>

                    {/* Footer Icons */}
                    <div className="flex items-center justify-center space-x-8 mt-12">
                        {[
                            { icon: <Coffee />, title: "Powered by Coffee", color: "hover:text-amber-500 dark:hover:text-amber-400" },
                            { icon: <Terminal />, title: "Code is Life", color: "hover:text-green-500 dark:hover:text-green-400" },
                            { icon: <Pizza />, title: "Debug Fuel", color: "hover:text-red-500 dark:hover:text-red-400" },
                            { icon: <Heart />, title: "Love what I do", color: "hover:text-pink-500 dark:hover:text-pink-400" }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`h-12 w-12 text-gray-400 dark:text-gray-500 ${item.color} cursor-pointer transform hover:scale-125 transition-all duration-300`}
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