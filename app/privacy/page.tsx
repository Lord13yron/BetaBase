export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 2, 2026</p>

      <p className="mb-6">
        BetaBase (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates
        getbetabase.com. This Privacy Policy explains what information we
        collect, how we use it, and your rights regarding your data.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="mb-2">
        We collect the following categories of information:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <strong>Account information:</strong> email address, full name,
          username, and avatar image provided during sign-up or onboarding.
        </li>
        <li>
          <strong>Profile information:</strong> optional details such as height
          and home gym that you provide voluntarily.
        </li>
        <li>
          <strong>User-generated content:</strong> climbing beta videos you
          upload and any associated metadata (route, grade, gym).
        </li>
        <li>
          <strong>Usage data:</strong> video view counts associated with your
          uploads, and pages you visit on the site.
        </li>
        <li>
          <strong>Authentication data:</strong> if you sign in with Google, we
          receive your name and email address from Google.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">
        2. How We Use Your Information
      </h2>
      <p className="mb-2">We use the information we collect to:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Create and manage your account</li>
        <li>Display your public profile and uploaded content to other users</li>
        <li>Process and host video uploads</li>
        <li>Respond to support requests sent to getbetabase@outlook.com</li>
        <li>Improve and maintain the platform</li>
      </ul>
      <p className="mb-4">
        We do not sell your personal information to third parties.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Third-Party Services</h2>
      <p className="mb-4">
        We use the following third-party services to operate BetaBase. Each has
        its own privacy policy governing their handling of data.
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <strong>Supabase</strong> — database and authentication (including
          email/password and OAuth)
        </li>
        <li>
          <strong>Mux</strong> — video hosting, processing, and streaming
        </li>
        <li>
          <strong>Google Sign-In</strong> — optional third-party authentication
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">
        4. Public Profile &amp; Content
      </h2>
      <p className="mb-4">
        Your username, avatar, home gym, and uploaded videos are visible to
        other users of BetaBase. If you do not want information to be public, do
        not add it to your profile or upload videos.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
      <p className="mb-4">
        We retain your account information and uploaded content for as long as
        your account is active. You may request deletion of your account and
        associated data at any time by contacting us at{" "}
        <a
          href="mailto:getbetabase@outlook.com"
          className="text-blue-500 underline"
        >
          getbetabase@outlook.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
      <p className="mb-4">
        We use cookies and local storage to maintain your authenticated session.
        No advertising or cross-site tracking cookies are used.
      </p>

      <h2 className="text-2xl font-semibold mb-2">
        7. Children&apos;s Privacy
      </h2>
      <p className="mb-4">
        BetaBase is not directed at children under 13. We do not knowingly
        collect personal information from children under 13. If you believe a
        child has provided us with their information, please contact us and we
        will delete it.
      </p>

      <h2 className="text-2xl font-semibold mb-2">8. Your Rights</h2>
      <p className="mb-2">
        Depending on your location, you may have rights including:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Accessing or correcting your personal data</li>
        <li>Requesting deletion of your data</li>
        <li>Withdrawing consent where processing is based on consent</li>
      </ul>
      <p className="mb-4">
        To exercise any of these rights, contact us at{" "}
        <a
          href="mailto:getbetabase@outlook.com"
          className="text-blue-500 underline"
        >
          getbetabase@outlook.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-2">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will update the
        &quot;last updated&quot; date at the top of this page. Continued use of
        BetaBase after changes constitutes acceptance of the updated policy.
      </p>

      <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at{" "}
        <a
          href="mailto:getbetabase@outlook.com"
          className="text-blue-500 underline"
        >
          getbetabase@outlook.com
        </a>
        .
      </p>
      <p className="text-sm text-gray-500 mt-8">
        This Privacy Policy is incorporated into our{" "}
        <a href="/terms" className="text-blue-500 underline">
          Terms and Conditions
        </a>
        .
      </p>
    </div>
  );
}
