
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getFavorites, deleteFavorite, updateFavoriteNotes, StoredFavorite } from '@/utils/favoritesStorage';
import { yeastTypes } from '@/utils/yeastTypes';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FAVORITES_UPDATED_EVENT = 'favoritesUpdated';

const FavoritesList = () => {
  const [favorites, setFavorites] = React.useState<StoredFavorite[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const refreshFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    refreshFavorites();

    const handleFavoritesUpdate = () => {
      refreshFavorites();
    };

    window.addEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate);

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate);
    };
  }, []);

  const handleDelete = (id: string) => {
    deleteFavorite(id);
    refreshFavorites();
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
    toast({
      title: "Conversion loaded",
      description: "The saved conversion has been loaded into the calculator.",
    });
  };

  if (favorites.length === 0) {
    return (
      <div 
        className="text-center p-8 text-muted-foreground"
        role="status"
        aria-label="No favorites"
      >
        <Star className="w-6 h-6 mx-auto mb-2 opacity-50" />
        No saved favorites yet. Save a conversion to see it here.
      </div>
    );
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-[400px] rounded-md border p-4 bg-background">
        <div className="space-y-4">
          {favorites.map((favorite) => (
            <Card 
              key={favorite.id} 
              className="bg-card transition-all duration-200 hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  {favorite.amount}g {yeastTypes[favorite.fromType]} to {yeastTypes[favorite.toType]}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {new Date(favorite.timestamp).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-primary">
                    {favorite.result}g
                  </p>
                  <div className="space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUse(favorite)}
                          className="text-foreground"
                        >
                          Use <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Load this conversion into the calculator
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(favorite.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Remove from favorites
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
};

export default FavoritesList;
