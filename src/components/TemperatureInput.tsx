import React from 'react';
import { Thermometer } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface TemperatureInputProps {
  temperature: string;
  setTemperature: (value: string) => void;
}

const TemperatureInput = ({ temperature, setTemperature }: TemperatureInputProps) => {
  const { toast } = useToast();
  
  const handleTemperatureChange = (value: string) => {
    console.log('Temperature Input - handleTemperatureChange called with:', value);
    
    if (value === '') {
      console.log('Temperature Input - Empty value, resetting to default (72)');
      setTemperature('72');
      return;
    }

    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      console.log('Temperature Input - Invalid number entered');
      toast({
        title: "Invalid Temperature",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (numValue < 32 || numValue > 120) {
      console.log('Temperature Input - Temperature out of range:', numValue);
      toast({
        title: "Invalid Temperature Range",
        description: "Temperature must be between 32°F and 120°F",
        variant: "destructive",
      });
      return;
    }

    console.log('Temperature Input - Setting new temperature:', value);
    setTemperature(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleTemperatureChange(value);
    }
  };

  const handleSliderChange = (value: number[]) => {
    console.log('Temperature Input - Slider changed to:', value[0]);
    setTemperature(value[0].toString());
  };

  return (
    <div className="w-full space-y-4">
      <label className="block text-sm font-medium mb-2">Room Temperature (°F)</label>
      <div className="relative">
        <Thermometer className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          type="text"
          pattern="[0-9]*\.?[0-9]*"
          value={temperature}
          onChange={handleInputChange}
          className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
          placeholder="Temperature (°F)"
          min="32"
          max="120"
        />
      </div>
      <Slider
        value={[parseFloat(temperature) || 72]}
        onValueChange={handleSliderChange}
        max={120}
        min={32}
        step={1}
        className="w-full touch-none"
      />
    </div>
  );
};

export default TemperatureInput;