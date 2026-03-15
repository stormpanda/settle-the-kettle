import { Chapter } from '../models/article';

export const ARTICLE_DATA: Chapter[] = [
  {
    id: 'kapitel-1-einleitung',
    title: 'Kapitel 1: Einleitung',
    sections: [
      {
        id: '1-einleitung',
        title: 'Die Evolution der digitalen Privatsphäre bis 2026',
        content: `
        <p class="mb-4">Die digitale Kommunikation hat in den letzten Jahren, getrieben durch ein wachsendes öffentliches Bewusstsein für Privatsphäre und staatliche Überwachung, eine massive Transformation durchlebt. Im Jahr 2026 ist Ende-zu-Ende-Verschlüsselung (E2EE) kein Nischenprodukt für Journalisten oder Whistleblower mehr, sondern der Standard für die zivile Kommunikation.</p>
        <p class="mb-4">Konkurrierten vor einem Jahrzehnt noch proprietäre und oft unverschlüsselte Netzwerke, stehen sich heute primär Messenger gegenüber, die Sicherheit als ihr Kernversprechen ansehen. Zwei der prominentesten und am häufigsten durch unabhängige Instanzen überprüften Vertreter sind <strong>Signal</strong> und <strong>Threema</strong>.</p>
        <p class="mb-4">Obwohl beide Messenger das gleiche Ziel verfolgen – die absolute Vertraulichkeit von Inhalten und die Integrität der Kommunikation –, unterscheiden sie sich fundamental in ihrer <strong>Architektur</strong>, ihrer <strong>Philosophie zur Datensparsamkeit</strong> und ihrem <strong>Umgang mit Metadaten</strong>.</p>
        <p>Signal (Non-Profit) setzt auf Open-Source-Stärke und technologische Innovation (z.B. PQXDH). Threema (kommerziell) profitiert von Schweizer Datenschutzgesetzen und Anonymität.</p>
        `
      }
    ]
  },
  {
    id: 'kapitel-2-bedrohungsmodelle-threat-modeling',
    title: 'Kapitel 2: Bedrohungsmodelle (Threat Modeling)',
    sections: [
      {
        id: '2-threat-modeling',
        title: 'Einordnung der Bedrohungsakteure',
        content: `
        <p class="mb-4">Sicherheit ist kein absoluter Zustand, sondern stets relativ zu einem <strong>Bedrohungsmodell</strong> (<em>Threat Model</em>). Die Bewertung eines Messengers hängt maßgeblich davon ab, gegen welche Art von Angreifer (Adversary) er schützen soll und welche Assets (Inhalte vs. Metadaten) am wichtigsten sind.</p>
        <ul class="list-disc pl-5 mb-6 space-y-2">
          <li><strong>Passive Massenüberwachung (z.B. NSA/GCHQ):</strong> Hört den Internetverkehr ab. Beide Messenger schützen die Inhalte.</li>
          <li><strong>Staatliche Ermittlungsbehörden (z.B. BKA/FBI):</strong> Fragen gezielt Metadaten an.</li>
          <li><strong>Lokale Angreifer (Physischer Zugriff):</strong> Entsperrtes Endgerät (z.B. Grenzkontrolle).</li>
          <li><strong>Zukünftige Bedrohungen (Harvest Now, Decrypt Later):</strong> Traffic aufzeichnen zum späteren Entschlüsseln mit Quantencomputern.</li>
        </ul>
        `,
        table: {
          id: 'table-threats',
          title: 'Vergleich der Bedrohungsmodelle',
          rows: [
            {
              label: 'Kenntnis über Kontakte (Social Graph)',
              signal: 'Schützt Metadaten sehr stark (Sealed Sender), nutzt aber weiterhin Telefonnummern als Basis.',
              threema: 'Perfekte Anonymität durch zufällige Threema-IDs. Keine Rufnummer nötig.',
              verdict: 'Threema ist überlegen (Whistleblowing).'
            },
            {
              label: 'Massen-Datenabfragen durch Behörden',
              signal: 'Signal speichert fast keine verwertbaren Daten (US-Jurisdiktion).',
              threema: 'Speichert keine IPs/Gruppen (Schweizer DSG).',
              verdict: 'Ebenbürtig.'
            },
            {
              label: 'Quantencomputer (Future Threats)',
              signal: 'Implementiert Post-Quantum-Cryptography (PQXDH / SPQR).',
              threema: 'Nutzt "Ibex"-Protokoll, bei PQC eher abwartend.',
              verdict: 'Vorteil Signal.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-3-kryptografische-primitiven',
    title: 'Kapitel 3: Kryptografische Primitiven',
    sections: [
      {
        id: '3-krypto-primitiven',
        title: 'Signal vs. NaCl',
        content: `
        <p class="mb-4">Die Sicherheit jedes Krypto-Systems steht und fällt mit der Wahl der zugrundeliegenden kryptografischen Primitiven. Signal setzt auf agile Komposition (X25519, AES-256, HMAC-SHA256, Kyber-1024), während Threema die hochsichere NaCl-Library von Daniel J. Bernstein nutzt (Curve25519, XSalsa20, Poly1305).</p>
        `,
        table: {
          id: 'table-crypto',
          title: 'Direkter Vergleich der Primitiven',
          rows: [
            { label: 'Elliptische Kurve', signal: 'X25519', threema: 'Curve25519', verdict: 'Identisch (State-of-the-Art)' },
            { label: 'Symmetrischer Cipher', signal: 'AES-256 (CBC/GCM)', threema: 'XSalsa20', verdict: 'Ebenbürtig' },
            { label: 'Message Authentication', signal: 'HMAC-SHA256', threema: 'Poly1305', verdict: 'Beide sehr sicher' },
            { label: 'Post-Quantum KEM', signal: 'Kyber-1024', threema: '-', verdict: 'Vorteil Signal' },
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-4-signal-protocol-deep-dive-double-ratchet-pqxdh-spqr',
    title: 'Kapitel 4: Signal Protocol Deep Dive',
    sections: [
      {
        id: '4-signal-protocol',
        title: 'Double Ratchet, PQXDH, SPQR',
        content: `
        <h4 class="text-xl font-semibold mb-2 mt-6">4.1. The Double Ratchet Algorithm</h4>
        <p class="mb-4">Der Kern des Signal Protocols ist der "Double Ratchet". Jede asynchrone Nachricht verändert die Schlüssel (Forward Secrecy & Future Secrecy).</p>
        
        <h4 class="text-xl font-semibold mb-2 mt-6">4.2. PQXDH (Post-Quantum Extended Diffie-Hellman)</h4>
        <p class="mb-4">Der ursprüngliche X3DH-Austausch wurde 2023 massiv aufgerüstet. PQXDH nutzt Kyber-1024, um den Schlüsselaustausch gegen Quantencomputer zu schützen.</p>
        
        <h4 class="text-xl font-semibold mb-2 mt-6">4.3. SPQR (Sparse Post-Quantum Ratchet)</h4>
        <p class="mb-4">Im Jahr 2025 schützt SPQR nun auch die kontinuierliche Kommunikation ("Ratcheting") quantenresistent.</p>
        
        <h4 class="text-xl font-semibold mb-2 mt-6">4.4. Skalierbarkeit: Sender Keys für Gruppen</h4>
        <p>Ein Mitglied generiert einen "Sender Key" und teilt ihn der Gruppe sicher per 1:1. Gruppennachrichten können so asymmetrisch signiert und nur <strong>einmal</strong> symmetrisch verschlüsselt an den Server gesendet (Fast Multicast) werden.</p>
        `
      }
    ]
  }
];
