import { Trash2, BarChart3, Cog, Check, Play, Info, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Trash2,
      title: "Waste Classification",
      description: "Our AI-powered waste classification system accurately identifies and categorizes waste materials, making recycling and disposal more efficient.",
      features: [
        "Real-time image analysis",
        "50+ waste categories",
        "Mobile-friendly interface",
        "High accuracy detection"
      ],
      cta: { text: "Try Demo", icon: Play, link: "/#classifier" }
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Gain insights into waste generation patterns with our advanced analytics tools. Track and optimize your waste management processes.",
      features: [
        "Custom dashboards",
        "Historical trend analysis",
        "Automated reporting",
        "Performance metrics"
      ],
      cta: { text: "Learn More", icon: Info, link: "/contact" }
    },
    {
      icon: Cog,
      title: "Custom Solutions",
      description: "We offer tailored AI solutions for businesses and municipalities to address specific waste management challenges.",
      features: [
        "API integration",
        "On-premise deployment",
        "Custom model training",
        "Enterprise support"
      ],
      cta: { text: "Contact Us", icon: Mail, link: "/contact" }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Comprehensive AI-powered solutions for your waste management needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const CtaIcon = service.cta.icon;
              
              return (
                <Card key={service.title} className="hover-lift h-full flex flex-col">
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-6 text-center">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8 flex-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {service.cta.link.startsWith('/#') ? (
                      <a href={service.cta.link}>
                        <Button className="w-full">
                          <CtaIcon className="w-4 h-4 mr-2" />
                          {service.cta.text}
                        </Button>
                      </a>
                    ) : (
                      <Link to={service.cta.link}>
                        <Button className="w-full">
                          <CtaIcon className="w-4 h-4 mr-2" />
                          {service.cta.text}
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose JunkJudge AI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with environmental expertise to deliver 
              exceptional waste management solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">99%</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Accuracy Rate</h3>
              <p className="text-muted-foreground">
                Industry-leading accuracy in waste classification and detection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">24/7</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock technical support and maintenance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">50+</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Categories</h3>
              <p className="text-muted-foreground">
                Comprehensive waste classification across multiple categories
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;