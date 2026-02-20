import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Video,
  Calendar,
  Clock,
  Users,
  Sparkles,
  Target,
  Lightbulb,
  MessageCircle,
  Play,
  Brain,
  Cpu,
  Globe,
  Zap,
  ArrowDown,
  ArrowLeft,
} from 'lucide-react';
import { getWebinarById } from '../services/webinarsData';

// ─── Icon map (keeps data file free of React imports) ────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Target,
  Lightbulb,
  MessageCircle,
  Brain,
  Cpu,
  Globe,
  Zap,
  Video,
  Play,
};

const WebinarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const webinar = id ? getWebinarById(id) : undefined;

  // ── 404 state ───────────────────────────────────────────────────────────────
  if (!webinar) {
    return (
      <div className="bg-[#18100F] min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Webinar Not Found</h1>
        <p className="text-gray-400 mb-8">
          We couldn't find a webinar with that ID.
        </p>
        <Link
          to="/academy"
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-bold hover:from-purple-600 hover:to-purple-700 transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Academy
        </Link>
      </div>
    );
  }

  const isCompleted = webinar.status === 'completed';
  const isUpcoming = webinar.status === 'upcoming';

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-brand-dark to-brand-dark" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=")`,
            }}
          />
        </div>

        {/* Floating accents */}
        <div className="absolute top-32 left-10 bg-purple-500/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 animate-float z-10 hidden lg:block">
          <Video className="w-8 h-8 text-purple-400" />
        </div>
        <div
          className="absolute bottom-40 right-20 bg-cyan-500/10 backdrop-blur-md rounded-xl p-4 border border-cyan-500/20 animate-float z-10 hidden lg:block"
          style={{ animationDelay: '0.5s' }}
        >
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Status badge */}
          <div className="inline-block mb-6">
            <span
              className={`text-sm font-semibold tracking-wider uppercase px-6 py-2 rounded-full border flex items-center gap-2 mx-auto w-fit ${
                isUpcoming
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-purple-400 bg-purple-500/10 border-purple-500/20'
              }`}
            >
              <Video className="w-4 h-4" />
              {isUpcoming ? 'Upcoming Free Webinar' : 'Completed Webinar — Recording Available'}
            </span>
          </div>

          {webinar.coOrganizer && (
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
              In partnership with · {webinar.coOrganizer}
            </p>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {webinar.title}
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {webinar.longDescription}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">{webinar.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">{webinar.time}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-semibold">Free Entry</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isCompleted ? (
              <a
                href="#recording"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] inline-flex items-center gap-2"
              >
                Watch Recording
                <ArrowDown className="w-5 h-5" />
              </a>
            ) : (
              <a
                href={webinar.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] inline-flex items-center gap-2"
              >
                Register Now — It's Free
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
            <button
              onClick={() => navigate('/academy')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Back to Academy
            </button>
          </div>
        </div>
      </section>

      {/* ── VIDEO (completed only) ────────────────────────────────────────────── */}
      {isCompleted && webinar.youtubeEmbedUrl && (
        <section id="recording" className="py-12 bg-[#18100F]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold text-purple-400 uppercase tracking-widest mb-6">
              📺 Full Recording
            </p>
            <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={webinar.youtubeEmbedUrl}
                  title={webinar.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT YOU'LL DISCOVER ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isCompleted ? 'What We Covered' : "What You'll Discover"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {webinar.duration} packed with insights, demos, and practical knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {webinar.topics.map((topic, index) => {
              const IconComponent = iconMap[topic.iconName] ?? Sparkles;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-gray-400">{topic.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {isCompleted ? 'What Attendees Got' : 'What You Will Get'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {webinar.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENDA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#18100F] via-purple-900/5 to-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isCompleted ? 'Session Agenda' : 'Agenda'}
            </h2>
          </div>
          <div className="space-y-4">
            {webinar.agenda.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 md:gap-6 items-start bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-xl p-5 hover:border-purple-500/20 transition-all"
              >
                <div className="flex-shrink-0 text-right min-w-[60px]">
                  <span className="text-xs font-mono font-bold text-purple-400">{item.time}</span>
                </div>
                <div className="w-px bg-white/10 self-stretch" />
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {webinar.guestSpeaker ? 'Your Speakers' : 'Your Host'}
            </h2>
          </div>

          <div
            className={`grid gap-6 ${
              webinar.guestSpeaker ? 'grid-cols-1 md:grid-cols-2' : 'max-w-md mx-auto'
            }`}
          >
            {/* Host */}
            <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-8 text-center">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-4 inline-block">
                Host
              </span>
              <div className="w-20 h-20 bg-cyan-500/10 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-cyan-400 border-2 border-cyan-500/20">
                {webinar.hostInitials}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{webinar.host}</h3>
              <p className="text-cyan-400 text-sm mb-4">{webinar.hostTitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{webinar.hostBio}</p>
            </div>

            {/* Guest speaker (if any) */}
            {webinar.guestSpeaker && (
              <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-8 text-center">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-4 inline-block">
                  Guest Speaker
                </span>
                <div className="w-20 h-20 bg-purple-500/10 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-purple-400 border-2 border-purple-500/20">
                  {webinar.guestSpeakerInitials}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{webinar.guestSpeaker}</h3>
                <p className="text-purple-400 text-sm mb-4">{webinar.guestSpeakerTitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{webinar.guestSpeakerBio}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              {isUpcoming ? (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Reserve Your Spot Now
                  </h3>
                  <p className="text-gray-400 mb-2 max-w-2xl mx-auto">{webinar.spots}</p>
                  <p className="text-sm text-gray-500 mb-8">Join link sent after registration</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={webinar.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all shadow-lg inline-flex items-center gap-2"
                    >
                      Register Now — It's Free
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => navigate('/academy')}
                      className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                    >
                      View Courses
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Enjoyed the Webinar?
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Take the next step — explore our courses and keep building your skills.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/academy#courses"
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all shadow-lg inline-flex items-center gap-2"
                    >
                      Explore Courses
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => navigate('/academy#webinars')}
                      className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                    >
                      More Webinars
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebinarDetailsPage;
