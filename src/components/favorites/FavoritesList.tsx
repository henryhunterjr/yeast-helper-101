import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getFavorites, deleteFavorite, updateFavoriteNotes, StoredFavorite } from '@/utils/favoritesStorage';
import { yeastTypes } from '@/utils/yeastCalculations';
import { useNavigate } from 'react-router-dom';

const FavoritesList = () => {
  const [favorites, setFavorites] = React.useState<StoredFavorite[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleDelete = (id: string) => {
    deleteFavorite(id);
    setFavorites(getFavorites());
    toast({
      title: "Favorite deleted",
      description: "The conversion has been removed from favorites.",
    });
  };

  const handleUse = (favorite: StoredFavorite) => {
    navigate('/', {
      state: {
        prefill: {
          amount: favorite.amount.toString(),
          fromType: favorite.fromType,
          toType: favorite.toType,
        }
      }
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No saved favorites yet. Save a conversion to see it here.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {favorites.map((favorite) => (
          <Card key={favorite.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {favorite.amount}g {yeastTypes[favorite.fromType]} to {yeastTypes[favorite.toType]}
              </CardTitle>
              <CardDescription>
                {new Date(favorite.timestamp).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-yeast-600">
                  {favorite.result}g
                </p>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUse(favorite)}
                  >
                    Use <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(favorite.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default FavoritesList;