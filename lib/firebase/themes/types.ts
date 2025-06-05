export type Section = {
    id: string;
    type: string; // ex: "hero", "products", etc.
    settings: Record<string, any>;
    optional?: boolean; // facultative ou non
    enabled?: boolean;  // activée ou non dans la boutique
  };
  
  export type Page = {
    id: string;     // ex: "home", "about"
    title: string;  // ex: "Accueil", "À propos"
    path: string;   // ex: "/home", "/about"
    sections: Section[];
  };
  
  export type Theme = {
    id: string;
    name: string;
    description?: string;
    previewImage?: string;
    pages: Page[];
  };
  