'use client';
import { Briefcase, Bug, Calendar, Coffee, Cpu, Github, GraduationCap, Heart, Laugh, Lightbulb, Linkedin, Mail, MapPin, Music, Pizza, Rocket, Terminal, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../components/theme/ThemeProvider';

const techStack = [
    {
        name: 'Python Whisperer 🐍',
        level: 90,
        description: 'Can make snakes dance to my code',
        color: 'from-green-400 to-blue-500',
        years: '9+'
    },
    {
        name: 'Java Juggler ☕',
        level: 85,
        description: 'Keeping multiple threads in the air without dropping any',
        color: 'from-orange-400 to-red-500',
        years: '8+'
    },
    {
        name: 'Scalable Systems Architect 🏗️',
        level: 88,
        description: 'Building systems that scale from 1 to millions',
        color: 'from-cyan-400 to-blue-500',
        years: '7+'
    },
    {
        name: 'Database Guru 💾',
        level: 85,
        description: 'PostgreSQL, Cassandra, and distributed data mastery',
        color: 'from-blue-400 to-indigo-500',
        years: '8+'
    },
    {
        name: 'Microservices Maestro 🎼',
        level: 87,
        description: 'Orchestrating services with Kafka, Kubernetes, and more',
        color: 'from-indigo-400 to-purple-500',
        years: '6+'
    },
    {
        name: 'Bug Detective 🔍',
        level: 95,
        description: 'Finding bugs that hide better than my car keys',
        color: 'from-purple-400 to-pink-500',
        years: '9+'
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
    },
    {
        icon: <Pizza className="w-5 h-5" />,
        fact: "Debugging sessions are powered by pizza and determination",
        color: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
    }
];

const experiences = [
    {
        title: "Senior Software Engineer",
        company: "Dell Technologies",
        period: "2022 - Present",
        description: "Leading backend development, serving as Product Owner and Security Champion",
        achievements: ["Microservices architecture leadership", "Large-scale database upgrades", "AI/ML prototyping", "Built IIQDeployMaster automation tool"]
    },
    {
        title: "Software Engineer",
        company: "Intel Corporation",
        period: "2016 - 2022",
        description: "Full-stack development and system optimization across enterprise solutions",
        achievements: ["Built scalable backend systems", "Performance optimization", "Cross-functional collaboration", "Mentored junior developers"]
    },
    {
        title: "Software Developer",
        company: "Girnar Soft Pvt Ltd, Jaipur",
        period: "2013 - 2014",
        description: "Started my journey in enterprise software development",
        achievements: ["Learned foundation technologies", "Rapid skill development", "Team collaboration", "Problem-solving excellence"]
    }
];

const currentlyLearning = [
    "🤖 AI/ML Applications & LLMs",
    "🐳 Kubernetes & Docker",
    "🔄 Apache Kafka & Event Streaming",
    "⚡ FastAPI & High-Performance APIs",
    "📊 System Design Patterns",
    "🛡️ Security Best Practices",
    "🚀 Developer Productivity Tools"
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
                    <div className="flex flex-col md:flex-row items-center mb-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl transition-colors duration-300">
                        <div className="relative mb-6 md:mb-0">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                                <Terminal className="w-16 h-16 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="ml-0 md:ml-8 text-center md:text-left">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                                Hey, I'm Tarun!
                                <span className="text-3xl ml-2 animate-wave inline-block">👋</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 flex items-center justify-center md:justify-start transition-colors duration-300">
                                <Briefcase className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                                Senior Software Engineer
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center md:justify-start transition-colors duration-300">
                                <MapPin className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" />
                                Pilani, Rajasthan, India
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center md:justify-start transition-colors duration-300">
                                <Calendar className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                                9+ years in software development
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl text-center transition-colors duration-300">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">9+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl text-center transition-colors duration-300">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">∞</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Learnings</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl text-center transition-colors duration-300">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">∞</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Bugs Fixed</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl text-center transition-colors duration-300">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Learning Mode</div>
                        </div>
                    </div>

                    {/* Status Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <CoffeeLevel />
                        <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg transition-colors duration-300">
                            <Bug className="w-5 h-5 text-red-500 dark:text-red-400 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">Bugs Squashed Today:</span>
                            <span className="ml-2 font-mono text-blue-500 dark:text-blue-400 animate-pulse">∞</span>
                        </div>
                    </div>

                    {/* About Me */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            About Me
                            <User className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
                        </h2>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-inner transition-colors duration-300">
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4 transition-colors duration-300">
                                I'm Tarun Sharma, a Senior Software Engineer passionate about building <strong>scalable backend systems, storage solutions, and AI-powered tools</strong>. With experience across <strong>Python, Java, Flask/FastAPI, Kafka, Kubernetes, and PostgreSQL/Cassandra</strong>, I love transforming complex challenges into elegant, production-ready solutions.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4 transition-colors duration-300">
                                At Dell, I've played multiple roles — <strong>Senior Engineer, Product Owner, and Security Champion</strong> — where I've led initiatives in <strong>microservices architecture, large-scale database upgrades, automation tools (like IIQDeployMaster), and AI/ML prototyping</strong>.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4 transition-colors duration-300">
                                Beyond my professional work, I actively explore <strong>system design</strong>, <strong>AI/ML applications</strong>, and <strong>developer productivity tools</strong>. I enjoy mentoring fellow engineers, writing about topics like Python internals and distributed systems, and sharing insights from real-world projects through my blog.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                                My mission: to make <strong>complex tech simple</strong> and <strong>accessible for everyone</strong> through practical tutorials, system design breakdowns, and hands-on learning. 🚀
                            </p>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Professional Journey
                            <Briefcase className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
                        </h2>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-sm border-l-4 border-blue-500 dark:border-blue-400 transition-colors duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.title}</h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">{exp.period}</span>
                                    </div>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.company}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.achievements.map((achievement, i) => (
                                            <span key={i} className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                                ✓ {achievement}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Tech Superpowers
                            <Cpu className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
                        </h2>
                        <div className="grid gap-6">
                            {techStack.map((skill, index) => (
                                <div
                                    key={skill.name}
                                    className="transform transition-all duration-300 hover:scale-102"
                                    onMouseEnter={() => setHoveredSkill(index)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    <div className={`bg-gradient-to-r ${skill.color} p-0.5 rounded-xl`}>
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl transition-colors duration-300">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <span className="text-gray-700 dark:text-gray-200 font-medium text-lg transition-colors duration-300">{skill.name}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">{skill.years} exp</span>
                                                </div>
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

                    {/* Currently Learning */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Currently Learning
                            <GraduationCap className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentlyLearning.map((item, index) => (
                                <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl text-center transition-colors duration-300 hover:shadow-md transform hover:scale-105 transition-all duration-200">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Debug Log (Fun Facts)
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

                    {/* Connect */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text flex items-center">
                            Let's Connect!
                            <Mail className="w-7 h-7 ml-2 text-blue-500 dark:text-blue-400" />
                        </h2>
                        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl transition-colors duration-300">
                            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 text-center transition-colors duration-300">
                                Always excited to connect with fellow developers, discuss tech, or collaborate on interesting projects!
                            </p>
                            <div className="flex justify-center space-x-6">
                                <a
                                    href="https://github.com/tarunsha009"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 transform hover:scale-105"
                                >
                                    <Github className="w-5 h-5 mr-2" />
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/tarunsharma009/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors duration-200 transform hover:scale-105"
                                >
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:tarunsha009@gmail.com"
                                    className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg transition-colors duration-200 transform hover:scale-105"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email
                                </a>
                            </div>
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