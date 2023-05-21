describe('Article creation test', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/articles-et-parutions.html');
  });

  it('Create new article', () => {
      cy.get('input#titre') // Sélectionne le champ de titre
          .type('Titre Test'); // Tape 'Titre Test' dans le champ de titre

      cy.get('textarea#contenu') // Sélectionne le champ de contenu
          .type('Contenu de test pour le nouvel article'); // Tape le contenu dans le champ de contenu

      cy.get('input#lien') // Sélectionne le champ de lien
          .type('http://exemple.com'); // Tape un lien fictif dans le champ de lien

      cy.get('#add-article-form button[type="submit"]') // Sélectionne le bouton de soumission
          .click(); // Clique sur le bouton de soumission

      // Vérifier que l'article a été ajouté
      cy.get('#articles h3') // Sélectionne le titre de l'article
          .contains('Titre Test') // Vérifie que le titre de l'article contient 'Titre Test'
      
      cy.get('#articles p') // Sélectionne le contenu de l'article
          .contains('Contenu de test pour le nouvel article'); // Vérifie que le contenu de l'article contient le texte de test
  });
});
