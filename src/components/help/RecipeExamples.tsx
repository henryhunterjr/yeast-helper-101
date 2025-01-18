import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecipeExamples = () => {
  const recipes = [
    {
      title: "Basic White Bread",
      ingredients: [
        "500g bread flour",
        "7g active dry yeast",
        "10g salt",
        "300ml water",
        "30g butter"
      ],
      notes: "Perfect for beginners. Uses active dry yeast with a 65% hydration ratio."
    },
    {
      title: "Artisan Sourdough",
      ingredients: [
        "400g bread flour",
        "100g whole wheat flour",
        "150g active sourdough starter",
        "350ml water",
        "10g salt"
      ],
      notes: "Advanced recipe with 75% hydration. Requires 12-18 hours fermentation."
    },
    {
      title: "Quick Dinner Rolls",
      ingredients: [
        "300g all-purpose flour",
        "5g instant yeast",
        "5g salt",
        "180ml warm milk",
        "30g butter",
        "1 egg"
      ],
      notes: "Fast recipe using instant yeast. Ready in 2-3 hours."
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recipe Examples</h2>
      
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {recipes.map((recipe, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Ingredients:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">{recipe.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecipeExamples;