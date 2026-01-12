import { Crown, Star, Zap, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Layout from '../components/Layout';
import { ANIMATIONS } from '../constants';

export default function About() {
  const values = [
    {
      icon: Crown,
      title: 'PREMIUM QUALITY',
      description: 'We deliver only the highest quality content and experiences for our VIP members.',
      color: 'from-pink-600 to-pink-700',
      borderColor: 'border-pink-500/30 hover:border-pink-400/60'
    },
    {
      icon: Zap,
      title: 'INNOVATION',
      description: 'Constantly pushing boundaries to bring you cutting-edge content and features.',
      color: 'from-purple-600 to-purple-700',
      borderColor: 'border-purple-500/30 hover:border-purple-400/60'
    },
    {
      icon: Heart,
      title: 'COMMUNITY',
      description: 'Building an exclusive community of premium members who value quality and exclusivity.',
      color: 'from-pink-600 to-purple-600',
      borderColor: 'border-pink-500/30 hover:border-purple-400/60'
    }
  ];

  return (
    <Layout>
      <section className="relative pt-32 md:pt-48 pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
              ABOUT US
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              PREMIUM EXCLUSIVE ACCESS • VIP MEMBERSHIP • EXCEPTIONAL CONTENT
            </p>
          </div>

          <div className="mb-20">
            <Card className="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-pink-500/30 rounded-2xl overflow-hidden">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-6">
                  <Crown className="w-12 h-12 text-black" />
                </div>
                <CardTitle className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  WELCOME TO AWFixer.VIP
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                  AWFixer.VIP is your gateway to exclusive premium content and VIP experiences. 
                  We curate the finest collection of wallpapers, exclusive content, and premium 
                  features for our distinguished members. Our mission is to provide an unparalleled 
                  experience that matches the premium quality you deserve.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                      1000+
                    </div>
                    <div className="text-gray-300 text-sm uppercase tracking-wider">
                      Premium Members
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                      5000+
                    </div>
                    <div className="text-gray-300 text-sm uppercase tracking-wider">
                      Exclusive Wallpapers
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                      24/7
                    </div>
                    <div className="text-gray-300 text-sm uppercase tracking-wider">
                      VIP Support
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              OUR VALUES
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card 
                    key={index}
                    className={`bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 ${value.borderColor} rounded-2xl overflow-hidden group ${ANIMATIONS.transitionSlow} hover:shadow-[0_0_40px_rgba(255,0,110,0.3)]`}
                  >
                    <CardHeader className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.color} rounded-xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="w-10 h-10 text-black" />
                      </div>
                      <CardTitle className="text-2xl font-black text-pink-400 mb-3">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
                JOIN OUR EXCLUSIVE COMMUNITY
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Become part of an elite group of members who value premium quality and exclusive access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-pink-400 mb-2">EXCLUSIVE TIER</h3>
                    <p className="text-gray-300">
                      Access premium wallpapers, exclusive content, and priority support. Perfect for those who want the best experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Crown className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-2">SUPER PREMIUM TIER</h3>
                    <p className="text-gray-300">
                      The ultimate VIP experience with unlimited access, custom content requests, and personal concierge service.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

