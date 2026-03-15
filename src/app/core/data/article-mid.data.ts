import { Chapter } from '../models/article';
import { ARTICLE_DATA as DATA_P1 } from './article.data';

export const ARTICLE_DATA_P2: Chapter[] = [
  {
    id: 'kapitel-5-threema-ibex-nacl',
    title: 'Kapitel 5: Threema Ibex & NaCl',
    sections: [
      {
        id: '5-threema-ibex',
        title: 'Forward Secrecy für Threema',
        content: `
        <h4 class="text-xl font-semibold mb-2 mt-6">5.1. Die klassische NaCl-Architektur</h4>
        <p class="mb-4">Die ursprüngliche NaCl-Implementierung von Threema bot kein generisches Perfect Forward Secrecy auf Message-Ebene. Hätte ein Angreifer Langzeitschlüssel erbeutet, wären alle aufgezeichneten historischen Nachrichten lesbar gewesen.</p>
        
        <h4 class="text-xl font-semibold mb-2 mt-6">5.2. Das Ibex-Protokoll</h4>
        <p>Mit Ibex schloss Threema Ende 2022 diese Lücke. Ibex führt ein KDF-Ratcheting ein, welches auf Threemas Architektur zugeschnitten ist. Clients verhandeln ephemere (flüchtige) Schlüssel per ECDH. Diese rotieren iterativ. Alte Nachrichten bleiben selbst bei einem Geräte-Hack sicher.</p>
        `
      }
    ]
  },
  {
    id: 'kapitel-6-post-quantum-cryptography',
    title: 'Kapitel 6: Post-Quantum Cryptography',
    sections: [
      {
        id: '6-pqc',
        title: 'Quantensicherheit (Harvest Now, Decrypt Later)',
        content: `
        <p class="mb-4">Das größte drohende Risiko für asymmetrische Kryptografie sind Quantencomputer. Die Strategie "Harvest Now, Decrypt Later" bedroht aktuell gespeicherte Metadaten und Inhalte.</p>
        <p class="mb-4">Signal schützt bereits heute mit PQXDH und SPQR die gesamte asynchrone Kette durch Kyber-1024 hybride KEMs. Threema verhält sich konservativer und evaluiert den Standard derzeit (Stand 2026) noch.</p>
        `,
        table: {
          id: 'table-pqc',
          title: 'Post-Quantum Resistenz im Vergleich',
          rows: [
            { label: 'PQC-Initialisierung (KEM)', signal: 'Kyber-1024 (PQXDH)', threema: 'In Evaluierung', verdict: 'Vorteil Signal' },
            { label: 'PQC im Chat (Ratchet)', signal: 'SPQR (seit 2025)', threema: 'Nein', verdict: 'Vorteil Signal' },
            { label: 'Strategie', signal: 'Aggressiver First Mover', threema: 'Konservativ abwartend', verdict: 'Signal klar vorn' }
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-7-identitätsmanagement-und-account-wiederherstellung',
    title: 'Kapitel 7: Identität und Recovery',
    sections: [
      {
        id: '7-identity',
        title: 'Telefonnummer vs. Zufalls-ID',
        content: `
        <p class="mb-4">Da E2EE-Messenger Chatverläufe zumeist nur lokal speichern, ist der drohende Identitätsverlust extrem hoch. Wichtig ist, zwischen reiner Wiederherstellung von ID/Kontakten und echten Chat-Backups zu unterscheiden.</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Signals PIN & SGX:</strong> Signal nutzt PINs für Kontakt/ID-Recoverys. Diese werden kryptografisch in manipulationssicheren Intel SGX Hardware-Enklaven geschützt (Secure Value Recovery).</li>
          <li><strong>Threema Safe:</strong> Dezentrales Backup für ID/Kontakte/Gruppen (ohne Chats). Passwortgeschützt auf Schweizer Servern oder lokal auf dem eigenen Nextcloud/WebDAV.</li>
        </ul>
        `,
        table: {
          id: 'table-identity',
          title: 'Recovery & Identitätsmerkmale',
          rows: [
            { label: 'Registrierung', signal: 'Telefonnummer (Zwang)', threema: 'Zufällige Threema-ID', verdict: 'Threema ("Privacy by Design")' },
            { label: 'Identitätsverschleierung', signal: 'Usernames', threema: 'Von Natur aus anonym', verdict: 'Ebenbürtig' },
            { label: 'Recovery-Methodik', signal: 'Signal PIN (SGX Enklaven)', threema: 'Threema Safe (scrypt, dezentral)', verdict: 'Metadaten bei beiden gesichert' }
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-8-client-side-security-backups-und-multi-device',
    title: 'Kapitel 8: Endgeräte-Sicherheit',
    sections: [
      {
        id: '8-device',
        title: 'Backups und Multi-Device-Architektur',
        content: `
        <p class="mb-4">Die stärkste Transportverschlüsselung ist wertlos bei einem Einbruch ins Smartphone ("Endpoint Compromise").</p>
        <p class="mb-4"><strong>Chat-Historie Backups:</strong> Signal bietet E2EE "Secure Backups" (seit 2025) direkt über die Cloud an. Threema verlagert die Verantwortung via OS-Backup oder lokale ZIP/Export-Dateien komplett zum Nutzer.</p>
        <h4 class="text-xl font-semibold mb-2 mt-6">8.3. Desktop-Clients</h4>
        <p>Signal war Vorreiter beim asynchronen Multi-Device-Support. Jeder Client generiert eigene Schlüssel (asynchron, Smartphone muss offline sein). Threema löste sich erst 2024/2025 mit <em>Desktop 2.0</em> aus der starren WebRTC-Klammer zum Smartphone und bietet inzwischen ebenfalls unabhängige Multi-Device Sessions.</p>
        `,
        table: {
          id: 'table-mobile',
          title: 'Lokale Sicherheitsfunktionen',
          rows: [
            { label: 'OS-Datenbankverschlüsselung', signal: 'Ja', threema: 'Ja (zusätzliches DB-Passwort möglich)', verdict: 'Beide sicher' },
            { label: 'Private/Versteckte Chats', signal: 'Nein (nur Zeit löschend)', threema: 'Ja (Biometrie pro Chat)', verdict: 'Threema' },
            { label: 'Chat-Sicherung in Cloud', signal: 'Secure Backups (E2EE)', threema: 'ZIP Exporte / OS-Backup', verdict: 'Signal (Komfort)' }
          ]
        }
      }
    ]
  },
  {
    id: 'kapitel-9-metadaten-analyse-und-vorratsdatenspeicherung',
    title: 'Kapitel 9: Metadaten und ISP',
    sections: [
      {
        id: '9-metadata',
        title: 'Sealed Sender & ZKP-Anonymität',
        content: `
        <h4 class="text-xl font-semibold mb-2 mt-6">9.1. Signals "Sealed Sender" & Private Groups V2</h4>
        <p class="mb-4">Um den Social Graph (wegen Rufnummern-Zwang) zu verbergen, verpackt der Absender auch seine eigene Identität. <strong>Private Groups V2:</strong> Obwohl der Signal-Server Gruppennachrichten administriert und routet, kennt er dank Zero-Knowledge Proofs (ZKP) und anonymen Credentials die Mitglieder-Identität mathematisch nachweislich nicht.</p>
        
        <h4 class="text-xl font-semibold mb-2 mt-6">9.3. ISP Vorratsdatenspeicherung</h4>
        <p>Telekommunikationsanbieter (ISPs) "sehen", wann eine TCP/IP Verbindung zu Signal oder Threema Servern aufgebaut wird, selbst wenn Server-seitig keine Logs existieren. Dagegen hilft auf Transportebene nur Tor oder ein strikter VPN.</p>
        `,
        table: {
          id: 'table-metadata',
          title: 'Schutz Metadaten',
          rows: [
            { label: 'Absender-Maskierung', signal: 'Sealed Sender', threema: 'Anonyme Threema-ID', verdict: 'Beide geschützt' },
            { label: 'Gruppen-Verwaltung', signal: 'Server-side mit ZKPs', threema: 'Komplett dezentral, clientbasiert', verdict: 'Unterschiedliche Methoden, selbes Ziel' },
            { label: 'ISP Überwachbarkeit', signal: 'IP Traffic sichtbar', threema: 'IP Traffic sichtbar', verdict: 'Gleich auf' }
          ]
        }
      }
    ]
  }
];

export const ARTICLE_DATA_FULL = [...DATA_P1, ...ARTICLE_DATA_P2];
