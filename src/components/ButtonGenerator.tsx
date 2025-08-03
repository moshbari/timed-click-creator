import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Eye, Code, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ButtonConfig {
  width: string;
  height: string;
  backgroundColor: string;
  borderWidth: string;
  borderColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  buttonText: string;
  linkUrl: string;
  delaySeconds: number;
  alignment: string;
}

const ButtonGenerator = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<ButtonConfig>({
    width: '200px',
    height: '50px',
    backgroundColor: '#3b82f6',
    borderWidth: '2px',
    borderColor: '#1d4ed8',
    textColor: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    buttonText: 'Click Me!',
    linkUrl: 'https://example.com',
    delaySeconds: 3,
    alignment: 'center'
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (config.delaySeconds > 0) {
      setShowPreview(false);
      const timer = setTimeout(() => {
        setShowPreview(true);
      }, config.delaySeconds * 1000);
      return () => clearTimeout(timer);
    } else {
      setShowPreview(true);
    }
  }, [config.delaySeconds]);

  const generateCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timed Button</title>
    <style>
        .button-container {
            text-align: ${config.alignment};
        }
        
        .timed-button {
            width: ${config.width};
            height: ${config.height};
            background-color: ${config.backgroundColor};
            border: ${config.borderWidth} solid ${config.borderColor};
            color: ${config.textColor};
            font-size: ${config.fontSize};
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            text-decoration: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: translateY(20px);
        }
        
        .timed-button.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timed-button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="button-container">
        <a href="${config.linkUrl}" target="_blank" rel="noopener noreferrer" class="timed-button" id="timedButton">
            ${config.buttonText}
        </a>
    </div>

    <script>
        window.addEventListener('load', function() {
            setTimeout(function() {
                const button = document.getElementById('timedButton');
                button.classList.add('show');
            }, ${config.delaySeconds * 1000});
        });
    </script>
</body>
</html>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      toast({
        title: "Code copied!",
        description: "The HTML code has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the code manually.",
        variant: "destructive",
      });
    }
  };

  const downloadCode = () => {
    const code = generateCode();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timed-button.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started!",
      description: "The HTML file has been downloaded.",
    });
  };

  const updateConfig = (key: keyof ButtonConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Timed Button Generator</h1>
          <p className="text-muted-foreground text-lg">Create customizable timed buttons for your website</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Button Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    value={config.width}
                    onChange={(e) => updateConfig('width', e.target.value)}
                    placeholder="200px"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={config.height}
                    onChange={(e) => updateConfig('height', e.target.value)}
                    placeholder="50px"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="textColor"
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateConfig('textColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={config.textColor}
                      onChange={(e) => updateConfig('textColor', e.target.value)}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="borderWidth">Border Width</Label>
                  <Input
                    id="borderWidth"
                    value={config.borderWidth}
                    onChange={(e) => updateConfig('borderWidth', e.target.value)}
                    placeholder="2px"
                  />
                </div>
                <div>
                  <Label htmlFor="borderColor">Border Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="borderColor"
                      type="color"
                      value={config.borderColor}
                      onChange={(e) => updateConfig('borderColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={config.borderColor}
                      onChange={(e) => updateConfig('borderColor', e.target.value)}
                      placeholder="#1d4ed8"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Input
                    id="fontSize"
                    value={config.fontSize}
                    onChange={(e) => updateConfig('fontSize', e.target.value)}
                    placeholder="16px"
                  />
                </div>
                <div>
                  <Label htmlFor="fontWeight">Font Weight</Label>
                  <Input
                    id="fontWeight"
                    value={config.fontWeight}
                    onChange={(e) => updateConfig('fontWeight', e.target.value)}
                    placeholder="bold"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={config.fontFamily} onValueChange={(value) => updateConfig('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
                    <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                    <SelectItem value="Georgia, serif">Georgia</SelectItem>
                    <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                    <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                    <SelectItem value="'Trebuchet MS', sans-serif">Trebuchet MS</SelectItem>
                    <SelectItem value="Impact, sans-serif">Impact</SelectItem>
                    <SelectItem value="'Comic Sans MS', cursive">Comic Sans MS</SelectItem>
                    <SelectItem value="'Lucida Console', monospace">Lucida Console</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={config.buttonText}
                  onChange={(e) => updateConfig('buttonText', e.target.value)}
                  placeholder="Click Me!"
                />
              </div>

              <div>
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  value={config.linkUrl}
                  onChange={(e) => updateConfig('linkUrl', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="delaySeconds">Delay (seconds)</Label>
                  <Input
                    id="delaySeconds"
                    type="number"
                    min="0"
                    value={config.delaySeconds}
                    onChange={(e) => updateConfig('delaySeconds', parseInt(e.target.value) || 0)}
                    placeholder="3"
                  />
                </div>
                <div>
                  <Label htmlFor="alignment">Button Alignment</Label>
                  <Select value={config.alignment} onValueChange={(value) => updateConfig('alignment', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview and Code Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                  <Badge variant="secondary">Resets every {config.delaySeconds}s</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="bg-muted/20 p-8 rounded-lg min-h-[120px] flex items-center"
                  style={{ justifyContent: config.alignment === 'center' ? 'center' : config.alignment === 'left' ? 'flex-start' : 'flex-end' }}
                >
                  {showPreview ? (
                    <a
                      href={config.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{
                        width: config.width,
                        height: config.height,
                        backgroundColor: config.backgroundColor,
                        border: `${config.borderWidth} solid ${config.borderColor}`,
                        color: config.textColor,
                        fontSize: config.fontSize,
                        fontWeight: config.fontWeight,
                        fontFamily: config.fontFamily,
                        textDecoration: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      {config.buttonText}
                    </a>
                  ) : (
                    <div className="text-muted-foreground">Button will appear in {config.delaySeconds} seconds...</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Generated Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Generated HTML Code
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadCode} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateCode()}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-code-bg"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Customize your button using the configuration panel on the left</li>
              <li>Preview how your button will look in the preview area</li>
              <li>Copy the generated HTML code or download it as a file</li>
              <li>Paste the code into your website where you want the button to appear</li>
              <li>The button will automatically appear after the specified delay when the page loads</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ButtonGenerator;