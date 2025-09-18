import { Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import teamPhoto from "@/assets/team-group-photo.jpg";

const About = () => {
  const teamMembers = [
    { name: "Mr. Shubham Nemade", role: "AI Engineer" },
    { name: "Mr. Palash Hemade", role: "Full Stack Developer" },
    { name: "Mr. Atharva Karale", role: "Data Scientist" },
    { name: "Ms. Anushka Somawanshi", role: "Product Manager" },
    { name: "Mr. Yash Gondane", role: "Sustainability Analyst" },
    { name: "Mr. Pruthviraj Desale", role: "Operations & Outreach Lead" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About JunkJudge AI</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Revolutionizing waste management through cutting-edge artificial intelligence
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  JunkJudge AI is a cutting-edge platform dedicated to revolutionizing waste management 
                  through artificial intelligence. Our mission is to provide innovative solutions for 
                  waste classification and recycling, helping businesses and communities reduce their 
                  environmental footprint.
                </p>
                <p>
                  Founded in 2023, JunkJudge AI combines state-of-the-art machine learning models with 
                  user-friendly interfaces to make waste classification accessible to everyone. Our team 
                  of experts is passionate about sustainability and technology, and we strive to create 
                  a cleaner, greener future.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-card rounded-2xl p-8 hover-lift">
                <img
                  src={teamPhoto}
                  alt="Our team working together"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground">
                  To leverage AI technology for creating sustainable waste management solutions 
                  that are accessible to all, making environmental responsibility easier for 
                  everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  A world where waste is efficiently classified and recycled, minimizing 
                  environmental impact and creating a sustainable future for generations to come.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of experts brings together expertise in AI, software development, 
              and environmental science to create innovative solutions.
            </p>
          </div>

          {/* --- MODIFIED TEAM GRID --- */}
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <Card key={member.name} className="hover-lift text-center w-full max-w-xs flex-shrink-0">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={`/api/placeholder/150/150?text=${member.name.charAt(0)}`}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-10"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;