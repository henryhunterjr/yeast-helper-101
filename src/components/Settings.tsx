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
import { UnitType } from '@/utils/yeastTypes';

// Create a custom event for unit changes
const unitChangeEvent = new Event('unitChange');

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [units, setUnits] = React.useState('metric');
  const [tempScale, setTempScale] = React.useState('F');
  const [defaultYeast, setDefaultYeast] = React.useState('active-dry');

  const handleSave = () => {
    // Convert units selection to UnitType
    let unitType: UnitType = 'g';
    if (units === 'imperial') {
      unitType = 'oz';
    } else if (units === 'teaspoons') {
      unitType = 'tsp';
    }

    const settings = {
      darkMode: isDarkMode,
      units: unitType,
      tempScale,
      defaultYeast
    };

    localStorage.setItem('yeastwise-settings', JSON.stringify(settings));
    
    // Dispatch the unit change event
    window.dispatchEvent(unitChangeEvent);
    
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
      
      // Convert UnitType back to radio selection
      if (settings.units === 'oz') {
        setUnits('imperial');
      } else if (settings.units === 'tsp') {
        setUnits('teaspoons');
      } else {
        setUnits('metric');
      }
      
      setTempScale(settings.tempScale);
      setDefaultYeast(settings.defaultYeast);
    }
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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