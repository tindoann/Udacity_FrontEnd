var bio = {
  name: 'Philip Fry',
  role: 'Web Developer',
  contacts: {
    mobile: '650-555-5555',
    email: 'john@example.com',
    github: 'johndoe',
    twitter: '@johndoe',
    location: 'San Francisco'
  },
  welcomeMessage: 'lorem pasum dolor sit amet etc etc etc',
  skills: ['Awesomeness', 'deliver things', 'cryogenic sleep', 'saving the universe'],
  biopic: 'fry.jpg'
};

var education = {
  schools: [
    {
    name: 'Nova Southeastern University - Masters',
    location: 'Fort Lauderdale, FL',
    majors: ['CS'],
    dates: '2013'
  },
    {
    name: 'Eckerd College - BA', 
    location : 'Saint Petersburg, FL', 
    majors: ['CS'],
    dates: '2003'
  }
], 

  onlineCourses: [
    {
      title: 'JavaScript Crash Course',
      school: 'Udacity',
      dates: '2014',
      url: 'https://www.udacity.com/course/ud804'
    }
  ]
}

var work = {
  jobs: [
    {
      employer: 'Planet Express',
      title: 'Delivery Boy',
      location: 'Brooklyn, NY',
      dates: '3000 - Future',
      description: "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy alreadale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta formage frais alredale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    },
    {
      employer: 'Delivery Boy',
      title: "Panucci's Pizza",
      location: 'Manhattan, NY',
      dates: '1998 - December 31, 1999',
      description: "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy alreadale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta formage frais alredale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg." 
    }
  ]
};



/*
 * Display functions
 */
bio.display = function() {
  // basic details
  var name = HTMLheaderName.replace('%data%', bio.name);
  var role = HTMLheaderRole.replace('%data%', bio.role);
  var bioPic = HTMLbioPic.replace('%data%', bio.biopic);
  var message = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);
  
  // contacts
  var contact = [
    HTMLmobile.replace('%data%', bio.contacts.mobile),
    HTMLemail.replace('%data%', bio.contacts.email),
    HTMLgithub.replace('%data%', bio.contacts.github),
    HTMLtwitter.replace('%data%', bio.contacts.twitter),
    HTMLlocation.replace('%data%', bio.contacts.location)
  ];

  $('#header').prepend(role);
  $('#header').prepend(name);
  $('#header').append(bioPic);
  $('#header').append(message);

  contact.forEach(function(c) {
    $('#topContacts').append(c);
    $('#footerContacts').append(c);
  });

  if (bio.skills.length > 0) {
    $('#header').append(HTMLskillsStart);
    bio.skills.forEach(function(s) {
      $('#skills').append(HTMLskills.replace('%data%', s));
    });
  }
};

education.display = function() {
  // schools
  if (education.schools.length > 0) {
    education.schools.forEach(function(s) {
      $('#education').append(HTMLschoolStart);
      var name = HTMLschoolName.replace('%data%', s.name);
      var degree = HTMLschoolDegree.replace('%data%', s.degree);
      var dates = HTMLschoolDates.replace('%data%', s.dates);
      var location = HTMLschoolLocation.replace('%data%', s.location);
      var major = HTMLschoolMajor.replace('%data%', s.majors[0]);

      $('.education-entry:last').append(name, [dates, location, major]);
    }); 
  }
  // online courses
  if (education.onlineCourses.length > 0) {
    $('#education').append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(oc) {
      $('#education').append(HTMLschoolStart);
      var title = HTMLonlineTitle.replace('%data%', oc.title).replace('#', oc.url);
      var school = HTMLonlineSchool.replace('%data%', oc.school);
      var dates = HTMLonlineDates.replace('%data%', oc.dates);
      var url = HTMLonlineURL.replace('%data%', oc.url).replace('#', oc.url);

      $('.education-entry:last').append(title + school, [dates, url]);
    });
  }
};

work.display = function() {
  if (work.jobs.length > 0) {
    $('#workExperience').append(HTMLworkStart);
    work.jobs.forEach(function(job) {
      var employer = HTMLworkEmployer.replace('%data%', job.employer);
      var title = HTMLworkTitle.replace('%data%', job.title);
      var location = HTMLworkLocation.replace('%data%', job.location);
      var worked = HTMLworkDates.replace('%data%', job.dates);
      var description = HTMLworkDescription.replace('%data%', job.description);
      title = employer + title;

      $('.work-entry:last').append(title, [location, worked, description]);
    });
  }
};

function setupMap() {
  $('#mapDiv').append(map);
}

// display stuff
bio.display();
education.display();
work.display();
$('#mapDiv').append(googleMap);
window.addEventListener('load', setupMap);
