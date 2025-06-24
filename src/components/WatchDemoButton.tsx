import * as Dialog from '@radix-ui/react-dialog';
import { X, Play, Leaf } from 'lucide-react';
import { Button } from './ui/button';

export const WatchDemoButton: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          <Play size={20} />
          Watch Demo
          <Leaf size={18} className="text-green-200" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Leaf className="text-green-600" size={24} />
              </div>
              <div>
                <Dialog.Title className="text-xl font-bold text-gray-900">
                  GreenFootprint Demo
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mt-1">
                  See how we're making sustainability accessible for everyone
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X size={18} />
              </Button>
            </Dialog.Close>
          </div>

          {/* Video Container */}
          <div className="p-6">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/P1gXhx1RXk4"
                title="GreenFootprint Demo - Sustainable Living Made Simple"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Footer with additional info */}
          <div className="p-6 pt-0">
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-200 rounded-full mt-1">
                  <Leaf size={14} className="text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">
                    Ready to start your green journey?
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    Join thousands of users already making a positive impact on our planet.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Get Started Free
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WatchDemoButton;