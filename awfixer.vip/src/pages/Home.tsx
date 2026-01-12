import Magnet from '../components/Magnet';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Crown, Eye, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, FEATURES, ANIMATIONS, HERO_BUTTONS } from '../constants';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 md:pt-48 pb-32 px-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 text-sm font-bold tracking-wider px-4 py-1.5 shadow-lg shadow-pink-500/20">
              PREMIUM ACCESS ONLY
            </Badge>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            AWFixer
            <span className="text-4xl md:text-6xl lg:text-7xl text-pink-500 block md:inline">.VIP</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            UNLOCK THE VAULT • EXCLUSIVE CONTENT • VIP ACCESS
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Magnet padding={80} magnetStrength={3}>
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-black font-black text-lg px-8 py-6 rounded-lg border-2 border-pink-500/30 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
              >
                <a href={HERO_BUTTONS.unlockAccess.link}>
                  <Crown className="w-6 h-6 mr-3" />
                  {HERO_BUTTONS.unlockAccess.text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </Magnet>
            <Magnet padding={80} magnetStrength={3}>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-2 border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 rounded-lg font-bold text-lg px-8 py-6 backdrop-blur-sm bg-black/20"
              >
                <a href={HERO_BUTTONS.previewContent.link}>
                  <Eye className="w-6 h-6 mr-3" />
                  {HERO_BUTTONS.previewContent.text}
                </a>
              </Button>
            </Magnet>
          </div>
        </div>
      </section>

      {/* Pricing Section - Enhanced */}
      <section id="pricing" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              CHOOSE YOUR TIER
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              SELECT YOUR ACCESS LEVEL • UNLOCK EXCLUSIVE BENEFITS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.id} 
                  id={plan.id}
                  className={`relative bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 ${plan.borderColor} ${ANIMATIONS.transitionSlow} hover:shadow-[0_0_60px_rgba(255,0,110,0.4)] rounded-2xl overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="text-center pb-8 relative z-10 pt-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-pink-500/30">
                      <IconComponent className="w-10 h-10 text-black" />
                    </div>
                    <Badge className={`absolute top-6 left-6 ${plan.badgeColor} font-black px-3 py-1 shadow-lg`}>
                      {plan.badge}
                    </Badge>
                    <CardTitle className={`text-3xl md:text-4xl font-black ${plan.textColor} mb-2`}>{plan.name}</CardTitle>
                    <CardDescription className="text-gray-300 text-lg">{plan.description}</CardDescription>
                    <div className="mt-8">
                      <span className={`text-6xl md:text-7xl font-black ${plan.textColor}`}>${plan.price}</span>
                      <span className="text-gray-400 text-xl">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-5 relative z-10 px-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 group/item">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 group-hover/item:scale-150 transition-transform" />
                        <span className="text-gray-200 font-medium text-base flex-1">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                  
                  <CardFooter className="pt-8 pb-6 relative z-10 px-6">
                    <Magnet padding={60} magnetStrength={2.5}>
                      <Button 
                        asChild
                        className={`w-full ${plan.buttonColor} rounded-xl font-bold text-lg py-6 ${ANIMATIONS.transition} ${plan.id === 'superpremium' ? ANIMATIONS.scale : ''} shadow-lg`}
                      >
                        <a href={plan.buttonLink}>
                          {plan.id === 'superpremium' && <Crown className="w-5 h-5 mr-2" />}
                          {plan.buttonText}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </Magnet>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="relative py-32 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              PREMIUM FEATURES
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              EXCLUSIVE BENEFITS • VIP PERKS • PREMIUM ACCESS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {FEATURES.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <a 
                  key={feature.id}
                  href={feature.link}
                  className="block no-underline"
                >
                  <Card 
                    className={`bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 ${feature.borderColor} ${ANIMATIONS.transitionSlow} hover:shadow-[0_0_40px_rgba(255,0,110,0.3)] rounded-2xl overflow-hidden group cursor-pointer h-full`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="text-center pt-8 relative z-10">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.iconColor} rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-black" />
                      </div>
                      <CardTitle className="text-2xl font-black text-pink-400 mb-3">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-8 relative z-10">
                      <CardDescription className="text-gray-300 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      <div className="mt-6 flex items-center justify-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-semibold">Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

