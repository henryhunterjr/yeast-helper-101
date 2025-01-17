import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, HelpCircle, Info, Scale, ThermometerSun } from 'lucide-react';
import { Button } from './ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

const HelpAbout = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Calculator</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Help & About</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-yeast-800">Help & About</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="quick-start">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yeast-600" />
                Quick Start Guide
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Basic Usage</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Enter the amount of yeast you have</li>
                      <li>Select your current yeast type</li>
                      <li>Choose the yeast type you want to convert to</li>
                      <li>Input the room temperature (optional)</li>
                      <li>View your conversion result and temperature adjustments</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

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
                    <tr>
                      <td className="p-2 border font-medium bg-yeast-50">Active Dry</td>
                      <td className="p-2 border">1</td>
                      <td className="p-2 border">0.89</td>
                      <td className="p-2 border">3</td>
                      <td className="p-2 border">48</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-medium bg-yeast-50">Instant</td>
                      <td className="p-2 border">1.125</td>
                      <td className="p-2 border">1</td>
                      <td className="p-2 border">3.375</td>
                      <td className="p-2 border">54</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-medium bg-yeast-50">Fresh</td>
                      <td className="p-2 border">0.333</td>
                      <td className="p-2 border">0.296</td>
                      <td className="p-2 border">1</td>
                      <td className="p-2 border">16</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-medium bg-yeast-50">Sourdough</td>
                      <td className="p-2 border">0.021</td>
                      <td className="p-2 border">0.019</td>
                      <td className="p-2 border">0.0625</td>
                      <td className="p-2 border">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="temperature">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-yeast-600" />
                Temperature Guidelines
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Temperature Ranges</h3>
                    <ul className="space-y-2">
                      <li><span className="font-medium">Cold (35-65°F):</span> Increase proofing time by 15-20%</li>
                      <li><span className="font-medium">Ideal (65-75°F):</span> Standard proofing time</li>
                      <li><span className="font-medium">Warm (75-85°F):</span> Decrease proofing time by 15-20%</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="troubleshooting">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-yeast-600" />
                Troubleshooting
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Common Issues</h3>
                    <ul className="space-y-2">
                      <li><span className="font-medium">Slow Rise:</span> Check water temperature and yeast freshness</li>
                      <li><span className="font-medium">No Rise:</span> Verify yeast is active and water temperature is correct</li>
                      <li><span className="font-medium">Over-proofing:</span> Reduce proofing time or temperature</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="about">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-yeast-600" />
                About
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  YeastWise v1.0.0 - Your professional companion for accurate yeast conversions
                </p>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Quick Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Always use room temperature ingredients unless specified</li>
                    <li>Store yeast in a cool, dry place</li>
                    <li>Check yeast expiration dates regularly</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Feedback</h3>
                  <p className="text-gray-600">
                    We value your input! Contact us at{' '}
                    <a href="mailto:feedback@yeastwise.app" className="text-yeast-600 hover:underline">
                      feedback@yeastwise.app
                    </a>
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HelpAbout;