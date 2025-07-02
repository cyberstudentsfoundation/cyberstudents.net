import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Requirements · CyberStudents",
};

export default function ServerRules() {
  return (
    <main className="mx-4 mt-10 mb-12 flex justify-center sm:mx-8 sm:mt-16 sm:mb-24 md:mx-10">
      <div className="w-full max-w-(--breakpoint-lg)">
        <div className="prose prose-gray prose-invert">
          <h1>Age Requirements</h1>
          <p>Last updated: July 1, 2025</p>
          <p>
            CyberStudents&rsquo; Terms of Service requires people to be over a minimum age to access our website and
            other services. We are required to comply with the Children&rsquo;s Online Privacy Protection Act (COPPA)
            and other applicable laws. Please see the following list of age requirements for your country or region.
          </p>
          <p>
            <strong>
              For all countries and regions not listed below, the minimum age to access our website and services is 13
              years old.
            </strong>
          </p>
          <h3>Asia</h3>
          <ul>
            <li>South Korea: 14+</li>
            <li>Vietnam: 15+</li>
          </ul>

          <h3>Caribbean</h3>
          <ul>
            <li>Aruba: 16+</li>
            <li>Caribbean Netherlands: 16+</li>
            <li>Curaçao: 16+</li>
            <li>Sint Maarten: 16+</li>
          </ul>

          <h3>Europe</h3>
          <ul>
            <li>Austria: 14+</li>
            <li>Bulgaria: 14+</li>
            <li>Croatia: 16+</li>
            <li>Cyprus: 14+</li>
            <li>Czech Republic: 15+</li>
            <li>France: 15+</li>
            <li>Germany: 16+</li>
            <li>Greece: 15+</li>
            <li>Hungary: 16+</li>
            <li>Ireland: 16+</li>
            <li>Italy: 14+</li>
            <li>Lithuania: 14+</li>
            <li>Luxembourg: 16+</li>
            <li>Netherlands: 16+</li>
            <li>Poland: 16+</li>
            <li>Romania: 16+</li>
            <li>San Marino: 16+</li>
            <li>Serbia: 15+</li>
            <li>Slovakia: 16+</li>
            <li>Slovenia: 16+</li>
            <li>Spain: 14+</li>
          </ul>

          <h3>Oceania</h3>
          <ul>
            <li>Australia: 16+ on and after December 1, 2025</li>
          </ul>

          <h3>South America</h3>
          <ul>
            <li>Chile: 14+</li>
            <li>Colombia: 14+</li>
            <li>Peru: 14+</li>
            <li>Venezuela: 14+</li>
          </ul>

          <p>
            Other social media platforms and websites used to register, sign in, or connect to your CyberStudents
            account may have different age requirements. Please check with those platforms before registering or signing
            in to CyberStudents.
          </p>

          <h2>Data removal requests</h2>
          <p>
            If you are the parent, guardian, or otherwise know of a child who has provided personal information to
            CyberStudents, you may request for us to delete that information by contacting us at{" "}
            <a href="mailto:admin@cyberstudents.net">admin@cyberstudents.net</a>.
          </p>
          <hr />
          <p>
            If you have any questions or concerns regarding our age requirements, please contact us at{" "}
            <a href="mailto:admin@cyberstudents.net">admin@cyberstudents.net</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
