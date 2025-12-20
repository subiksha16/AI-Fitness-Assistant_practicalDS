import React, { useState } from 'react';
import { Star, Calendar, Camera, CheckCircle, Bell, User, Dumbbell, Apple, Clock, TrendingUp, Award, MessageSquare, Video, BarChart3, AlertCircle, Zap, Users, FileText, Search, Send, Image, Mic, ChevronRight, Target, Heart, Droplet, Moon, Activity } from 'lucide-react';
import RepCounter from "./RepCounter";
import GymAIAssistant from './GymAIAssistant.jsx';

export default function GymTrainerPlatform() {
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [connectedTrainer, setConnectedTrainer] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showRepCounter, setShowRepCounter] = useState(false);

  const [onboardingData, setOnboardingData] = useState({
    goals: [],
    injuries: '',
    equipment: [],
    schedule: '',
    coachingStyle: '',
    experience: '',
    preferredTime: ''
  });

  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Push-ups', reps: 20, sets: 3, completed: false, scheduled: '09:00 AM', weight: 0, notes: '' },
    { id: 2, name: 'Squats', reps: 15, sets: 4, completed: false, scheduled: '09:30 AM', weight: 0, notes: '' },
    { id: 3, name: 'Bench Press', reps: 12, sets: 3, completed: false, scheduled: '10:00 AM', weight: 135, notes: '' }
  ]);

  const [meals, setMeals] = useState([
    { id: 1, name: 'Breakfast', calories: 450, protein: 25, carbs: 50, fat: 15, logged: true, time: '08:00 AM' },
    { id: 2, name: 'Lunch', calories: 600, protein: 40, carbs: 65, fat: 20, logged: true, time: '01:00 PM' },
    { id: 3, name: 'Dinner', calories: 0, protein: 0, carbs: 0, fat: 0, logged: false, time: '07:00 PM' }
  ]);

  const [dailyHabits, setDailyHabits] = useState({
    water: 6,
    waterGoal: 8,
    sleep: 7,
    sleepGoal: 8,
    steps: 8500,
    stepsGoal: 10000
  });

  const [trainerClients, setTrainerClients] = useState([
    { id: 1, name: 'John Doe', adherence: 92, lastWorkout: '2 hours ago', status: 'on-track', alerts: 0 },
    { id: 2, name: 'Sarah Smith', adherence: 78, lastWorkout: '1 day ago', status: 'warning', alerts: 1 },
    { id: 3, name: 'Mike Johnson', adherence: 45, lastWorkout: '3 days ago', status: 'critical', alerts: 3 }
  ]);

  const trainers = [
    {
      id: 1,
      name: 'Alex Martinez',
      rating: 4.9,
      reviews: 342,
      specialty: 'Strength Training',
      experience: '8 years',
      price: '$49/month',
      image: '👨‍💼',
      successRate: '94%',
      clients: 45,
      language: 'English, Spanish',
      style: 'Motivational & Data-driven'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 4.8,
      reviews: 289,
      specialty: 'Weight Loss & Nutrition',
      experience: '6 years',
      price: '$45/month',
      image: '👩‍💼',
      successRate: '91%',
      clients: 38,
      language: 'English',
      style: 'Supportive & Holistic'
    },
    {
      id: 3,
      name: 'Mike Chen',
      rating: 4.7,
      reviews: 267,
      specialty: 'Bodybuilding & Hypertrophy',
      experience: '10 years',
      price: '$55/month',
      image: '👨‍🏫',
      successRate: '89%',
      clients: 52,
      language: 'English, Mandarin',
      style: 'Intense & Technical'
    }
  ];

  const fitnessGoals = ['Weight Loss', 'Muscle Gain', 'Strength', 'Endurance', 'Flexibility', 'General Fitness'];
  const equipmentOptions = ['Dumbbells', 'Barbell', 'Resistance Bands', 'Pull-up Bar', 'Gym Access', 'Bodyweight Only'];
  const coachingStyles = ['Motivational', 'Technical', 'Supportive', 'Strict', 'Flexible'];

  const handleConnect = (trainer) => {
    setSelectedTrainer(trainer);
    setShowOnboarding(true);
  };

  const completeOnboarding = () => {
    setConnectedTrainer(selectedTrainer);
    setShowOnboarding(false);
    setActiveTab('client-dashboard');
  };

  const toggleWorkout = (id) => {
    setWorkouts(workouts.map(w =>
      w.id === id ? { ...w, completed: !w.completed } : w
    ));
  };

  const scanFood = () => {
    alert('📸 Camera activated! AI analyzing meal...\n\nDetected: Grilled Chicken Salad\n• Calories: 380\n• Protein: 35g\n• Carbs: 28g\n• Fat: 12g\n\nAdd to today\'s log?');
  };

  const calculateComplianceScore = () => {
    const caloriesLogged = meals.filter(m => m.logged).reduce((sum, m) => sum + m.calories, 0);
    const targetCalories = 2200;
    const proteinLogged = meals.filter(m => m.logged).reduce((sum, m) => sum + m.protein, 0);
    const targetProtein = 150;

    const calorieScore = Math.min((caloriesLogged / targetCalories) * 100, 100);
    const proteinScore = Math.min((proteinLogged / targetProtein) * 100, 100);
    const waterScore = (dailyHabits.water / dailyHabits.waterGoal) * 100;
    const sleepScore = (dailyHabits.sleep / dailyHabits.sleepGoal) * 100;

    return Math.round((calorieScore + proteinScore + waterScore + sleepScore) / 4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-slate-200" />
              </div>
              <h1 className="text-2xl font-bold text-slate-100">FitPro Elite</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {!userType ? (
                <>
                  <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Home</button>
                  <button onClick={() => setActiveTab('features')} className={`${activeTab === 'features' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Features</button>
                </>
              ) : userType === 'client' ? (
                <>
                  <button onClick={() => setActiveTab('client-dashboard')} className={`${activeTab === 'client-dashboard' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Dashboard</button>
                  <button onClick={() => setActiveTab('trainers')} className={`${activeTab === 'trainers' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Find Trainer</button>
                  <button onClick={() => setActiveTab('nutrition')} className={`${activeTab === 'nutrition' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Nutrition</button>
                  <button onClick={() => setActiveTab('progress')} className={`${activeTab === 'progress' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Progress</button>
                </>
              ) : (
                <>
                  <button onClick={() => setActiveTab('trainer-dashboard')} className={`${activeTab === 'trainer-dashboard' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Dashboard</button>
                  <button onClick={() => setActiveTab('clients')} className={`${activeTab === 'clients' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Clients</button>
                  <button onClick={() => setActiveTab('programs')} className={`${activeTab === 'programs' ? 'text-slate-200' : 'text-slate-400'} hover:text-slate-200 transition-colors font-medium`}>Programs</button>
                </>
              )}
            </nav>
            <div className="flex items-center space-x-4">
              {userType && (
                <>
                  <button onClick={() => setShowAIAssistant(!showAIAssistant)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 text-slate-400 hover:text-slate-200" />
                  </button>
                  <button onClick={() => setShowChat(!showChat)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative">
                    <Bell className="w-5 h-5 text-slate-400 hover:text-slate-200" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </>
              )}
              <User className="w-5 h-5 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'home' && !userType && (
          <div className="space-y-12">
            <div className="text-center space-y-6 py-12">
              <h2 className="text-5xl font-bold text-slate-100 leading-tight">
                AI-Powered Personal Training<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                  That Actually Works
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Connect with certified trainers, get personalized programs, track with AI, and achieve results with intelligent coaching.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => { setUserType('client'); setActiveTab('trainers'); }}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  I'm a Client
                </button>
                <button
                  onClick={() => { setUserType('trainer'); setActiveTab('trainer-dashboard'); }}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-100 rounded-lg font-semibold transition-all border border-slate-700"
                >
                  I'm a Trainer
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                <Camera className="w-10 h-10 text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-100 mb-2">AI Rep Counting</h3>
                <p className="text-slate-400 text-sm">Real-time form tracking with pose estimation</p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                <Target className="w-10 h-10 text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-100 mb-2">Smart Matching</h3>
                <p className="text-slate-400 text-sm">Find trainers based on goals and style</p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                <BarChart3 className="w-10 h-10 text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-100 mb-2">Progress Analytics</h3>
                <p className="text-slate-400 text-sm">Track volume, intensity, and progression</p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                <MessageSquare className="w-10 h-10 text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-100 mb-2">24/7 AI Assistant</h3>
                <p className="text-slate-400 text-sm">Instant answers and workout substitutions</p>
              </div>
            </div>
          </div>
        )}

        {showOnboarding && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Fitness Assessment</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">What are your fitness goals?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {fitnessGoals.map(goal => (
                      <button
                        key={goal}
                        onClick={() => {
                          const goals = onboardingData.goals.includes(goal)
                            ? onboardingData.goals.filter(g => g !== goal)
                            : [...onboardingData.goals, goal];
                          setOnboardingData({ ...onboardingData, goals });
                        }}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${onboardingData.goals.includes(goal)
                            ? 'bg-slate-700 border-slate-600 text-slate-100'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Available Equipment</label>
                  <div className="grid grid-cols-2 gap-3">
                    {equipmentOptions.map(eq => (
                      <button
                        key={eq}
                        onClick={() => {
                          const equipment = onboardingData.equipment.includes(eq)
                            ? onboardingData.equipment.filter(e => e !== eq)
                            : [...onboardingData.equipment, eq];
                          setOnboardingData({ ...onboardingData, equipment });
                        }}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${onboardingData.equipment.includes(eq)
                            ? 'bg-slate-700 border-slate-600 text-slate-100'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                      >
                        {eq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Injuries or Limitations</label>
                  <textarea
                    value={onboardingData.injuries}
                    onChange={(e) => setOnboardingData({ ...onboardingData, injuries: e.target.value })}
                    placeholder="e.g., Lower back pain, knee issues..."
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Preferred Coaching Style</label>
                  <select
                    value={onboardingData.coachingStyle}
                    onChange={(e) => setOnboardingData({ ...onboardingData, coachingStyle: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-slate-600"
                  >
                    <option value="">Select style...</option>
                    {coachingStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Experience Level</label>
                  <select
                    value={onboardingData.experience}
                    onChange={(e) => setOnboardingData({ ...onboardingData, experience: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-slate-600"
                  >
                    <option value="">Select level...</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Weekly Schedule</label>
                  <input
                    type="text"
                    value={onboardingData.schedule}
                    onChange={(e) => setOnboardingData({ ...onboardingData, schedule: e.target.value })}
                    placeholder="e.g., Mon/Wed/Fri mornings"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={completeOnboarding}
                    className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg font-semibold transition-all"
                  >
                    Complete & Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trainers' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100">Find Your Perfect Trainer</h2>
                <p className="text-slate-400 mt-2">AI-powered matching based on your goals and preferences</p>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search trainers..."
                  className="bg-transparent text-slate-300 outline-none w-48"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {trainers.map(trainer => (
                <div key={trainer.id} className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6 hover:border-slate-700 transition-all">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-5xl">{trainer.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100">{trainer.name}</h3>
                      <p className="text-slate-400 text-sm mb-2">{trainer.specialty}</p>
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-slate-300 font-semibold">{trainer.rating}</span>
                          <span className="text-slate-500 text-sm">({trainer.reviews})</span>
                        </div>
                        <span className="text-slate-500 text-sm">{trainer.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-slate-500 text-xs mb-1">Success Rate</p>
                      <p className="text-slate-200 font-semibold">{trainer.successRate}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-slate-500 text-xs mb-1">Active Clients</p>
                      <p className="text-slate-200 font-semibold">{trainer.clients}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg col-span-2">
                      <p className="text-slate-500 text-xs mb-1">Coaching Style</p>
                      <p className="text-slate-200 font-semibold">{trainer.style}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-slate-300 font-bold">{trainer.price}</span>
                    <button
                      onClick={() => handleConnect(trainer)}
                      className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2"
                    >
                      <span>Connect</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'client-dashboard' && userType === 'client' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100">Your Workout Dashboard</h2>
                {connectedTrainer && (
                  <p className="text-slate-400 mt-2">Training with {connectedTrainer.name}</p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => setShowChat(!showChat)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center space-x-2 transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-semibold">Message Trainer</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-100">Today's Compliance Score</h3>
                <div className="text-4xl font-bold text-slate-100">{calculateComplianceScore()}%</div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <Apple className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Calories</p>
                  <p className="text-lg font-semibold text-slate-200">1,050 / 2,200</p>
                </div>
                <div className="text-center">
                  <Droplet className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Water</p>
                  <p className="text-lg font-semibold text-slate-200">{dailyHabits.water} / {dailyHabits.waterGoal}</p>
                </div>
                <div className="text-center">
                  <Moon className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Sleep</p>
                  <p className="text-lg font-semibold text-slate-200">{dailyHabits.sleep}h / {dailyHabits.sleepGoal}h</p>
                </div>
                <div className="text-center">
                  <Activity className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Steps</p>
                  <p className="text-lg font-semibold text-slate-200">{dailyHabits.steps.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-slate-400" />
                Today's Workout Schedule
              </h3>
              <div className="space-y-3">
                {workouts.map(workout => (
                  <div key={workout.id} className={`bg-slate-800/50 p-4 rounded-lg border ${workout.completed ? 'border-slate-700 opacity-60' : 'border-slate-700'} transition-all`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <button
                          onClick={() => toggleWorkout(workout.id)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${workout.completed ? 'bg-slate-700 border-slate-600' : 'border-slate-600 hover:border-slate-500'}`}
                        >
                          {workout.completed && <CheckCircle className="w-5 h-5 text-slate-400" />}
                        </button>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-200">{workout.name}</h4>
                          <p className="text-sm text-slate-500">
                            {workout.reps} reps × {workout.sets} sets
                            {workout.weight > 0 && ` @ ${workout.weight}lbs`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-400 text-sm">{workout.scheduled}</span>
                        <button
                          onClick={() => setShowRepCounter(true)}
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
                        >
                          <Camera className="w-5 h-5 text-slate-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {showRepCounter && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-900 p-4 rounded-lg w-full max-w-md">
                      <button
                        className="mb-2 p-1 bg-slate-700 rounded"
                        onClick={() => setShowRepCounter(false)}
                      >
                        Close
                      </button>
                      <RepCounter />
                    </div>
                  </div>
                )}


              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Completed Today</p>
                    <p className="text-3xl font-bold text-slate-100">{workouts.filter(w => w.completed).length}/{workouts.length}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-slate-600" />
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Weekly Streak</p>
                    <p className="text-3xl font-bold text-slate-100">5 days</p>
                  </div>
                  <Award className="w-10 h-10 text-slate-600" />
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Total Workouts</p>
                    <p className="text-3xl font-bold text-slate-100">42</p>
                  </div>
                  <Dumbbell className="w-10 h-10 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && userType === 'client' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">Nutrition Tracker</h2>
              <p className="text-slate-400 mt-2">Scan your meals or enter information manually</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-8 text-center">
                <Camera className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-100 mb-2">Scan Meal</h3>
                <p className="text-slate-400 mb-6">Take a photo to analyze nutrients automatically</p>
                <button
                  onClick={scanFood}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-semibold transition-all w-full"
                >
                  Open Camera
                </button>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-8 text-center">
                <Apple className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-100 mb-2">Manual Entry</h3>
                <p className="text-slate-400 mb-6">Enter meal information manually for tracking</p>
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-semibold transition-all w-full">
                  Add Meal
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-6">Today's Meals</h3>
              <div className="space-y-3">
                {meals.map(meal => (
                  <div key={meal.id} className={`bg-slate-800/50 p-4 rounded-lg border ${meal.logged ? 'border-slate-700' : 'border-slate-700 border-dashed'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-200">{meal.name}</h4>
                        <p className="text-sm text-slate-500">{meal.time}</p>
                      </div>
                      {meal.logged ? (
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-slate-400">{meal.calories} cal</span>
                          <span className="text-slate-400">{meal.protein}g protein</span>
                          <CheckCircle className="w-5 h-5 text-slate-600" />
                        </div>
                      ) : (
                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold transition-all">
                          Log Meal
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-6">Daily Nutrition Summary</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-slate-500 text-sm mb-2">Calories</p>
                  <p className="text-2xl font-bold text-slate-100">1,050</p>
                  <p className="text-slate-600 text-sm">/ 2,200 goal</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-2">Protein</p>
                  <p className="text-2xl font-bold text-slate-100">65g</p>
                  <p className="text-slate-600 text-sm">/ 150g goal</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-2">Carbs</p>
                  <p className="text-2xl font-bold text-slate-100">115g</p>
                  <p className="text-slate-600 text-sm">/ 250g goal</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-2">Fats</p>
                  <p className="text-2xl font-bold text-slate-100">35g</p>
                  <p className="text-slate-600 text-sm">/ 70g goal</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trainer-dashboard' && userType === 'trainer' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100">Trainer Dashboard</h2>
                <p className="text-slate-400 mt-2">Manage your clients and programs</p>
              </div>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Add Client</span>
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Active Clients</p>
                    <p className="text-3xl font-bold text-slate-100">{trainerClients.length}</p>
                  </div>
                  <Users className="w-10 h-10 text-slate-600" />
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Avg Adherence</p>
                    <p className="text-3xl font-bold text-slate-100">72%</p>
                  </div>
                  <BarChart3 className="w-10 h-10 text-slate-600" />
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Sessions Today</p>
                    <p className="text-3xl font-bold text-slate-100">5</p>
                  </div>
                  <Calendar className="w-10 h-10 text-slate-600" />
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Alerts</p>
                    <p className="text-3xl font-bold text-slate-100">4</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-slate-600" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Client Overview</h3>
              <div className="space-y-3">
                {trainerClients.map(client => (
                  <div key={client.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-200">{client.name}</h4>
                          <p className="text-sm text-slate-500">Last workout: {client.lastWorkout}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-slate-500">Adherence</p>
                          <p className={`text-lg font-bold ${client.adherence >= 80 ? 'text-green-500' :
                              client.adherence >= 60 ? 'text-yellow-500' :
                                'text-red-500'
                            }`}>{client.adherence}%</p>
                        </div>
                        {client.alerts > 0 && (
                          <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400 font-semibold">{client.alerts} alert{client.alerts > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                Recent Alerts
              </h3>
              <div className="space-y-3">
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-200">Sarah Smith - Low Adherence</p>
                      <p className="text-sm text-slate-400">Missed 3 workouts this week. Calories under target 5 days straight.</p>
                      <button className="mt-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-semibold transition-all">
                        Send Check-in
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-200">Mike Johnson - Critical Status</p>
                      <p className="text-sm text-slate-400">No activity in 3 days. Last reported knee pain during squats.</p>
                      <button className="mt-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-semibold transition-all">
                        Contact Client
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && userType === 'client' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">Your Progress</h2>
              <p className="text-slate-400 mt-2">Track your fitness journey over time</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-4">Weight Progress</h3>
                <div className="h-48 flex items-center justify-center text-slate-500">
                  <BarChart3 className="w-12 h-12" />
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-4">Strength Gains</h3>
                <div className="h-48 flex items-center justify-center text-slate-500">
                  <TrendingUp className="w-12 h-12" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Weekly Summary</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <p className="text-slate-500 text-sm mb-2">Workouts Completed</p>
                  <p className="text-3xl font-bold text-slate-100">12</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <p className="text-slate-500 text-sm mb-2">Total Volume</p>
                  <p className="text-3xl font-bold text-slate-100">15,400</p>
                  <p className="text-xs text-slate-600">lbs lifted</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <p className="text-slate-500 text-sm mb-2">Avg Calories</p>
                  <p className="text-3xl font-bold text-slate-100">2,150</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <p className="text-slate-500 text-sm mb-2">Compliance</p>
                  <p className="text-3xl font-bold text-slate-100">87%</p>
                </div>
              </div>
            </div>
          </div>
        )}

      {showAIAssistant && (
        <GymAIAssistant
          showAIAssistant={showAIAssistant}
          setShowAIAssistant={setShowAIAssistant}
        />
      )}
      </main>

      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; 2024 FitPro Elite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
