'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 
import { Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState('');


  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage('');

    if (mediaType === 'image') {
      setTimeout(() => {
        const imageUrl = `https://placehold.co/1024x1024?text=${encodeURIComponent(prompt)}`;
        setGeneratedImage(imageUrl);
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">AI Media Generator</h1>
        <p className="text-gray-400 mt-2">Create stunning visuals and videos with the power of AI.</p>
      </header>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <Tabs defaultValue="image" onValueChange={setMediaType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="image">Generate Image</TabsTrigger>
              <TabsTrigger value="video">Generate Video</TabsTrigger>
            </TabsList>
            <TabsContent value="image"></TabsContent>
            <TabsContent value="video"></TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mediaType === 'image' ? "e.g., A cinematic shot of a raccoon in a library" : "e.g., An epic movie trailer for a cat's space adventure"}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </CardFooter>
      </Card>

      {(loading || generatedImage) && (
        <div className="mt-8 w-full aspect-square bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
          {loading ? (
            <p>Your creation is being generated...</p>
          ) : (
            generatedImage && <Image src={generatedImage} alt={prompt} width={1024} height={1024} className="rounded-lg" />
          )}
        </div>
      )}

      {mediaType === 'video' && !loading && (
           <div className="mt-8 w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
             <p>Video generation is coming soon. Stay tuned!</p>
           </div>
         )}
    </div>
  );
}