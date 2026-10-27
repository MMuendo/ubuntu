const nextConfig = {
  outputFileTracingIncludes: {
    "/api/mentorship/files/**": ["./private/downloads/**/*"]
  },
  redirects() {
    return [
      { source: "/projects", destination: "/mentorships", permanent: false },
      { source: "/projects/showcase", destination: "/proof", permanent: false },
      { source: "/projects/propose", destination: "/mentors/propose", permanent: false },
      { source: "/projects/:slug", destination: "/mentorships/apply?project=:slug", permanent: false }
    ];
  }
};

export default nextConfig;
