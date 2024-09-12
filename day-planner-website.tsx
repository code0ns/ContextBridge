import React, { useState } from 'react';
import { Save, Download, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const DayPlannerWebsite = () => {
  const [plannerData, setPlannerData] = useState(
    Array.from({ length: 24 }, (_, i) => ({ hour: i, tasks: [''] }))
  );

  const handleInputChange = (hour, index, value) => {
    const newData = [...plannerData];
    newData[hour].tasks[index] = value;
    setPlannerData(newData);
  };

  const handleKeyDown = (e, hour, index) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newData = [...plannerData];
      newData[hour].tasks.splice(index + 1, 0, '');
      setPlannerData(newData);
    }
  };

  const addTask = (hour) => {
    const newData = [...plannerData];
    newData[hour].tasks.push('');
    setPlannerData(newData);
  };

  const removeTask = (hour, index) => {
    const newData = [...plannerData];
    newData[hour].tasks.splice(index, 1);
    if (newData[hour].tasks.length === 0) {
      newData[hour].tasks = [''];
    }
    setPlannerData(newData);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving data:', plannerData);
  };

  const handleDownload = () => {
    // Implement PDF download functionality here
    console.log('Downloading PDF');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">24-Hour Day Planner</h1>
        
        {plannerData.map(({ hour, tasks }) => (
          <Card key={hour} className="mb-4">
            <CardHeader className="py-2">
              <CardTitle className="text-lg">{`${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Textarea
                    value={task}
                    onChange={(e) => handleInputChange(hour, index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, hour, index)}
                    placeholder="Enter your task here..."
                    className="flex-grow mr-2"
                    rows={1}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeTask(hour, index)}
                    className="mr-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  {index === tasks.length - 1 && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => addTask(hour)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end space-x-4 mt-8">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayPlannerWebsite;
