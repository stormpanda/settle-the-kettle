import { Chapter } from '../models/article';
import { ARTICLE_DATA_FULL } from './article-mid.data';

export const ARTICLE_DATA_FINAL: Chapter[] = [
  {
    id: 'kapitel-10-jurisdiktion-us-cloud-act-vs-schweizer-dsg',
    title: 'Kapitel 10: Jurisdiktion (US vs CH)',
    sections: [
      {
        id: '10-law',
        title: 'Cloud Act vs. DSG',
        content: `
        <p class="mb-4">Auch der sicherste Server unterliegt der Macht des Staates, auf dessen Grund er steht.</p>
        <p class="mb-4"><strong>Signal (US Cloud Act):</strong> Die US-Behörden können Subpoenas erzwingen. In der Praxis liefert Signal fast immer nur "Erstellungsdatum" und "letzte Verbindung", da der Server schlichtweg "nichts weiß" (<em>Nothing to yield</em>).</p>
        <p><strong>Threema (Schweizer DSG):</strong> Unterliegt extrem striktem IT-Datenschutz. Eine Beschlagnahmung durch US/EU-Behörden ist direkt unmöglich und zwingt diese über den diplomatisch mühsamen Rechts-Weg (IRG). IPs werden nicht protokolliert und echte Namen sind nicht verknüpft.</p>
        `
      }
    ]
  },
  {
    id: 'kapitel-11-infrastruktur-cloud-hosting-awsgcp-vs-eigene-rechenzentren',
    title: 'Kapitel 11: Geschäfts- & Servermodelle',
    sections: [
      {
        id: '11-infrastructure',
        title: 'Cloud-Hosting vs. Eigene Racks',
        content: `
        <p class="mb-4"><strong>Signal:</strong> Finanziert als Non-Profit Organisation (starke Unabhängigkeit), nutzt für Hunderte Millionen Nutzer aber gezwungenermaßen Big-Tech Clouds (AWS, GCP). Da durch E2EE Inhalte verdeckt sind, bleibt dies für Nachrichten irrelevant; Admins von Amazon stellen aber rein theoretisch im Trustlayer (bei SGX Enklaven) ein Risiko-Vektor dar.</p>
        <p><strong>Threema:</strong> Kommerziell finanziert (Pay-to-Download/Lizenzen). Kunden sind das Kapital, nicht das Produkt. Threema betreibt eigene Bare-Metal Server im Raum Zürich in völliger Autarkie.</p>
        `,
        table: {
          id: 'table-infra',
          title: 'Fundamentale Strukturen',
          rows: [
            { label: 'Finanzierung', signal: 'Non-Profit Foundation (Spenden)', threema: 'Kommerziell (Einmalkauf/Lizenzen)', verdict: '-' },
            { label: 'Infrastruktur', signal: 'AWS / Google Cloud', threema: 'Eigene Racks (Colocation, Schweiz)', verdict: 'Threema (weniger Dritt-Admins)' },
            { label: 'Skalierung', signal: 'Global Unbegrenzt (Cloud)', threema: 'Ressourcengebunden', verdict: 'Signal' }
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-12-transparenz-audits-auswertung-der-cure53-berichte',
    title: 'Kapitel 12: Audits & Transparenz',
    sections: [
      {
        id: '12-audits',
        title: 'Cure53 & Open Source Sicherheit',
        content: `
        <p class="mb-4">Beide Messenger basieren auf konsequenten Open-Source Clients und werden regelmäßig brutal geprüft.</p>
        <p>Signals formelle Protokolle sind weltweit führend dokumentiert und bilden den akademischen Standard für E2EE. Threema wurde in jüngster Zeit (2024/2025) durch <strong>Cure53</strong> massiv auf Herz und Nieren (insbesondere Ibex) getestet, wobei exzellente Code-Qualität durch Red-Teams formell bestätigt wurde. Bei Threema ist die Kernapplikation und die Krypto-Lib Open Source; der Server-Stack (aus Anti-Spam Gründen) jedoch teils proprietär (Zero-Trust Model).</p>
        `
      }
    ]
  },
  {
    id: 'kapitel-13-fallstudien-und-forensik-resistenz',
    title: 'Kapitel 13: Zensur & Endpoint-Forensik',
    sections: [
      {
        id: '13-forensics',
        title: 'AFU, BFU und Domain Fronting',
        content: `
        <h4 class="text-xl font-semibold mb-2 mt-6">13.1. Zensurabwehr</h4>
        <p class="mb-4">Signal baut im Iran/Russland aktiv auf Zensurabwehr (Proxy Server System, früher Domain Fronting). Threema bietet diese Mittel nicht an.</p>
        
        <h4 class="text-xl font-semibold mb-2 mt-6">13.2. Geräterettung (Diebstahl)</h4>
        <p class="mb-4">Im <strong>BFU</strong>-Status (Before First Unlock) sind alle lokalen DBs durch Apple/Google Secure Enclaves gesichert. Im <strong>AFU</strong>-Status (Gerät ist aktiv) können Forensik-Teams beide Apps mit Exploits auslesen. Signal dichtet hier oft aktiv Schnittstellen gegen Magnet Axiom & Cellebrite ab ("Hack-Back"). Threema's Disappearing Messages und Passcode-Private-Chats (zweiter Faktor) helfen als Barriere enorm.</p>
        `
      }
    ]
  },
  {
    id: 'kapitel-14-enterprise-einsatz',
    title: 'Kapitel 14: Der Markt für Behörden (B2B)',
    sections: [
      {
        id: '14-enterprise',
        title: 'Threema Work',
        content: `
        <p class="mb-4">Für Institutionen gelten DSGVO/MDM-Regeln, die rein private Consumer-Konzepte scheitern lassen.</p>
        <p>Während Signal als Ad-Hoc-Kommunikationsmittel der "Schatten-IT" unreguliert agiert (Achtung beim BYOD), bietet <strong>Threema Work</strong> ein professionelles MDM für tausende Enterprise-Admins (Policies, LDAP Einbindung, zentrale Kontakte) – als offizieller Messenger der Bundesverwaltung und Schweizer Armee.</p>
        `,
        table: {
          id: 'table-b2b',
          title: 'Geschäftseinsatz',
          rows: [
            { label: 'B2B/Enterprise Edition', signal: 'Nein', threema: 'Ja (Threema Work)', verdict: 'Threema' },
            { label: 'MDM & IT-Admin Dashboard', signal: 'Nein', threema: 'Vollständig integriert', verdict: 'Threema' },
            { label: 'DSGVO B2B Compliance', signal: 'Grauzone', threema: '100% Swiss Made / ID basiert', verdict: 'Threema' }
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-15-fazit-und-ausblick',
    title: 'Kapitel 15: Das große Fazit',
    sections: [
      {
        id: '15-fazit',
        title: 'Der Innovator vs. Der Purist',
        content: `
        <p class="mb-4">Signal liefert den "Hardcore Cryptographic Innovator": Perfekt in Gebieten absoluter Zensurangst (Proxys), Vorreiter bei Post-Quantum Thematik und massiv finanziert. Es liefert mathematisch und systemisch den stärksten machbaren globalen Schutz (eingetrübt durch die Zwangsnutzung von Handynummern).</p>
        <p class="mb-4">Threema agiert als "Privacy Purist": Ohne Nummer, ohne Datensilos und mit starkem B2B-Fokus (Threema Work) liefert es maximale Anonymität, gestützt durch sichere Schweizer Infrastruktur.</p>
        <p>Der wahre Feind der 2020er und 2030er bleibt die Politik: Weder State-of-the-Art PQC Algorithmen noch Schweizer Datenschutz helfen langfristig, falls Client-Side-Scanning (Chatkontrolle) staatlich ultimativ erzwungen wird. Hieran werden beide Systeme in der Zukunft gemessen.</p>
        `
      }
    ]
  }
];

export const ALL_CHAPTERS = [...ARTICLE_DATA_FULL, ...ARTICLE_DATA_FINAL];
