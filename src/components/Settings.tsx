import React from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from './ui/use-toast';

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="space-y-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Dark Mode</Label>
            <p className="text-sm text-gray-500">Switch between light and dark themes</p>
          </div>
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            className="data-[state=checked]:bg-yeast-600"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base">Units</Label>
          <RadioGroup value={units} onValueChange={setUnits} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric (g)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial (oz)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base">Temperature Scale</Label>
          <RadioGroup value={tempScale} onValueChange={setTempScale} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="fahrenheit" />
              <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="C" id="celsius" />
              <Label htmlFor="celsius">Celsius (°C)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base">Default Yeast Type</Label>
          <Select value={defaultYeast} onValueChange={setDefaultYeast}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select default yeast type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
              <SelectItem value="instant">Instant Yeast</SelectItem>
              <SelectItem value="fresh">Fresh Yeast</SelectItem>
              <SelectItem value="sourdough">Sourdough Starter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSave}
          className="w-full bg-yeast-600 hover:bg-yeast-700 text-white"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;