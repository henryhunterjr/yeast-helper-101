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
    navigate('/');
  };

  const handleClose = () => {
    navigate('/');
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
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your yeast calculator preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
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
            className="w-full"
          >
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;