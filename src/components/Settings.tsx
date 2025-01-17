import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import ThemeSettings from './settings/ThemeSettings';
import UnitSettings from './settings/UnitSettings';
import YeastTypeSettings from './settings/YeastTypeSettings';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [units, setUnits] = React.useState('metric');
  const [tempScale, setTempScale] = React.useState('F');
  const [defaultYeast, setDefaultYeast] = React.useState('active-dry');

  const handleSave = () => {
    localStorage.setItem('yeastwise-settings', JSON.stringify({
      darkMode: isDarkMode,
      units,
      tempScale,
      defaultYeast
    }));
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
  };

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.darkMode);
      setUnits(settings.units);
      setTempScale(settings.tempScale);
      setDefaultYeast(settings.defaultYeast);
    }
  }, []);

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your yeast calculator preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          </div>

          <div className="space-y-8 bg-white rounded-lg shadow-lg p-6">
            <ThemeSettings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <UnitSettings 
              units={units} 
              setUnits={setUnits}
              tempScale={tempScale}
              setTempScale={setTempScale}
            />
            <YeastTypeSettings defaultYeast={defaultYeast} setDefaultYeast={setDefaultYeast} />

            <Button 
              onClick={handleSave}
              className="w-full bg-yeast-600 hover:bg-yeast-700 text-white"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;