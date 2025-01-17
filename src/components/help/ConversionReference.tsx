import React, { useState } from 'react';
import { Scale, Copy, Check } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const ConversionReference = () => {
  const { toast } = useToast();
  const [copiedCell, setCopiedCell] = useState<string | null>(null);

  const handleCopyValue = (value: string, description: string) => {
    navigator.clipboard.writeText(value);
    setCopiedCell(value);
    toast({
      title: "Copied to clipboard",
      description: `Conversion ratio: ${description}`,
      duration: 2000,
    });
    setTimeout(() => setCopiedCell(null), 2000);
  };

  return (
    <AccordionItem value="conversion">
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-yeast-600" />
          Conversion Reference
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yeast-50">
                <th className="p-2 text-left border">From / To</th>
                <th className="p-2 text-left border">Active Dry</th>
                <th className="p-2 text-left border">Instant</th>
                <th className="p-2 text-left border">Fresh</th>
                <th className="p-2 text-left border">Sourdough</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Active Dry', '1', '0.89', '3', '48'],
                ['Instant', '1.125', '1', '3.375', '54'],
                ['Fresh', '0.333', '0.296', '1', '16'],
                ['Sourdough', '0.021', '0.019', '0.0625', '1']
              ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="p-2 border font-medium bg-yeast-50">{row[0]}</td>
                  {row.slice(1).map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-2 border">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-mono"
                              onClick={() => handleCopyValue(
                                cell,
                                `${row[0]} to ${['Active Dry', 'Instant', 'Fresh', 'Sourdough'][cellIndex]}`
                              )}
                            >
                              {cell}
                              {copiedCell === cell ? (
                                <Check className="ml-2 h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="ml-2 h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy conversion ratio</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ConversionReference;