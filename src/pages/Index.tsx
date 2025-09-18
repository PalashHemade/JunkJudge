import { useState, useRef } from "react";
import { Camera, Upload, Link as LinkIcon, Play, Brain, Recycle, Eye, EyeOff, Copy, Sliders, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero.png";

// API Configuration from original script.js
const API_CONFIG = {
  model: "garbage-classification-3-i5yna",
  version: 6,
  api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
  baseUrl: "https://detect.roboflow.com/"
};

const Index = () => {
  const [activeMethod, setActiveMethod] = useState("upload");
  const [confidence, setConfidence] = useState([50]);
  const [overlap, setOverlap] = useState([50]);
  const [outputFormat, setOutputFormat] = useState("image");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [resultType, setResultType] = useState<'image' | 'json'>('image');
  const [showLabels, setShowLabels] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Convert file to base64
  const getBase64fromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      toast({
        title: "Image Selected",
        description: `${file.name} is ready for analysis.`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile && !imageUrl) {
      toast({
        title: "No Input",
        description: "Please select an image file or provide a URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Build API URL
      const parts = [
        API_CONFIG.baseUrl,
        API_CONFIG.model,
        "/",
        API_CONFIG.version,
        "?api_key=" + API_CONFIG.api_key
      ];

      // Add parameters
      parts.push("&confidence=" + (confidence[0] / 100));
      parts.push("&overlap=" + (overlap[0] / 100));
      parts.push("&format=" + outputFormat);
      
      if (outputFormat === "image") {
        parts.push("&labels=" + (showLabels ? "on" : "off"));
      }

      let requestOptions: RequestInit;

      if (selectedFile) {
        // Handle file upload
        const base64Image = await getBase64fromFile(selectedFile);
        const base64Data = base64Image.split(',')[1]; // Remove data URL prefix

        requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: base64Data
        };
      } else {
        // Handle URL method
        parts.push("&image=" + encodeURIComponent(imageUrl));
        requestOptions = {
          method: 'POST'
        };
      }

      const response = await fetch(parts.join(""), requestOptions);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      if (outputFormat === "json") {
        const jsonResult = await response.json();
        setResult(JSON.stringify(jsonResult, null, 2));
        setResultType('json');
      } else {
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setResult(imageUrl);
        setResultType('image');
      }

      toast({
        title: "Analysis Complete!",
        description: "Successfully classified waste materials in the image.",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlSubmit = (url: string) => {
    if (url) {
      setImageUrl(url);
      setSelectedFile(null); // Clear file if URL is provided
    }
  };

  const copyResults = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Results copied to clipboard.",
      });
    }
  };

  const steps = [
    {
      number: 1,
      icon: Camera,
      title: "Capture",
      description: "Take a photo or upload an image of waste items"
    },
    {
      number: 2,
      icon: Brain,
      title: "Analyze",
      description: "Our AI model processes the image in seconds"
    },
    {
      number: 3,
      icon: Recycle,
      title: "Classify",
      description: "Get accurate waste classification results"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Smart Waste Classification with AI
                <span className="bg-gradient-neon bg-clip-text text-transparent animate-pulse-glow"></span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Revolutionizing recycling through computer vision and machine learning
              </p>
              <a href="#classifier">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-white text-black hover:bg-primary-glow hover:neon-glow transition-all duration-300 font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Now
                </Button>
              </a>
            </div>
            <div className="relative animate-scale-in">
              <div className="bg-green-700 backdrop-blur-sm rounded-3xl p-8 hover-lift">
                <img
                  src={heroImage}
                  alt="AI Waste Classification"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to classify your waste materials with AI precision
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={step.number} className="hover-lift text-center relative">
                  <CardContent className="p-8">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-neon rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 hover:subtle-glow transition-all duration-300">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waste Classifier */}
      <section id="classifier" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Waste Classifier</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload an image, provide a URL, or use your camera to classify waste materials instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Input Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeMethod} onValueChange={setActiveMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload size={16} />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <LinkIcon size={16} />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="flex items-center gap-2">
                      <Camera size={16} />
                      Camera
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="mt-6">
                    {!selectedFile ? (
                      <div
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add('border-primary');
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-primary');
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-primary');
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                      >
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          Drag & drop your image here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports: JPG, PNG, GIF (Max 10MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border border-border rounded-lg p-4 bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Upload className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">{selectedFile.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={removeSelectedFile}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Select Different Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="url" className="mt-6">
                    <div className="space-y-4">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleUrlSubmit((e.target as HTMLInputElement).value);
                            }
                          }}
                        />
                        <Button
                          onClick={() => handleUrlSubmit(imageUrl)}
                          disabled={!imageUrl.trim()}
                        >
                          Set URL
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="camera" className="mt-6">
                    <div className="text-center">
                      <div className="bg-muted rounded-lg p-8 mb-4">
                        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Camera functionality</p>
                        <p className="text-sm text-muted-foreground">
                          Click to enable camera access
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline">Start Camera</Button>
                        <Button disabled>Capture & Analyze</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Advanced Options */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Sliders size={18} />
                      Advanced Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Confidence Threshold: {confidence[0]}%</Label>
                      <Slider
                        value={confidence}
                        onValueChange={setConfidence}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>Max Overlap: {overlap[0]}%</Label>
                      <Slider
                        value={overlap}
                        onValueChange={setOverlap}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Output Format</Label>
                      <RadioGroup
                        value={outputFormat}
                        onValueChange={setOutputFormat}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="image" id="image" />
                          <Label htmlFor="image">Image</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="json" id="json" />
                          <Label htmlFor="json">JSON</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  disabled={isAnalyzing || (!selectedFile && !imageUrl.trim())}
                  onClick={analyzeImage}
                >
                  {isAnalyzing ? (
                    "Analyzing..."
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Classify Waste
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Classification Results</CardTitle>
                  {result && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLabels(!showLabels)}
                      >
                        {showLabels ? <EyeOff size={16} /> : <Eye size={16} />}
                        {showLabels ? "Hide Labels" : "Show Labels"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResults}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    {resultType === "image" ? (
                      <div className="relative">
                        <img
                          src={result}
                          alt="Analyzed waste with AI classification results"
                          className="w-full h-auto max-h-96 object-contain rounded-lg border"
                        />
                      </div>
                    ) : (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                        {result}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No results yet. Upload or capture an image to analyze.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;