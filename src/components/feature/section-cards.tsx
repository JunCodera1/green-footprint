import { Leaf, TreePine, Recycle, Zap, Shield, Users } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const cards = [
  {
    title: 'Carbon Tracking',
    description: 'Monitor your carbon footprint in real-time with our advanced tracking system.',
    icon: Leaf,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Smart Home',
    description: "Optimize your home's energy consumption with our smart home integration.",
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Carbon Offset',
    description: 'Offset your carbon emissions by supporting verified environmental projects.',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Eco Community',
    description: 'Connect with like-minded individuals and share your sustainability journey.',
    icon: Users,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Sustainable Living',
    description: 'Get tips and resources for living a more sustainable lifestyle.',
    icon: Recycle,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Tree Planting',
    description: 'Contribute to reforestation efforts through our tree planting program.',
    icon: TreePine,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export function SectionCards() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-4`}
          >
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <h3
            className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {card.title}
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
