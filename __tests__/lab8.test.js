describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.$$eval("journal-entry", (entry) => entry[0].click()); 
    expect(page.url()).toMatch("/#entry1"); 
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let head = await page.$eval('h1', (header) => header.innerHTML); 
    expect(head).toBe("Entry 1"); 
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    let entry = await page.$$("journal-entry")
    let f_entry = await entry[0].getProperty('entry'); 
    let data = await f_entry.jsonValue(); 
    expect(data.title).toBe('You like jazz?'); 
    expect(data.date).toBe('4/25/2021'); 
    expect(data.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."); 
    expect(data.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455'); 
    expect(data.image.alt).toBe('bee with sunglasses'); 
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    let body_elem = await page.$eval("body", (e) => e.classList); 
    expect(body_elem[0]).toBe("single-entry"); 

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click("header > img"); 
    expect(page.url()).toMatch("http://127.0.0.1:5500/#settings"); 
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let head = await page.$eval('h1', (header) => header.innerHTML); 
    expect(head).toBe("Settings"); 
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let body_elem = await page.$eval("body", (e) => e.classList); 
    expect(body_elem[0]).toBe("settings"); 
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack(); 
    expect(page.url()).toMatch("/#entry1"); 
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it("Test11: Clicking the back button once should bring the user back to the home page", async() => {
    await page.goBack(); 
    expect(page.url()).toBe("http://127.0.0.1:5500/"); 
  }); 

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it("Test12: When the user if on the homepage, the header title should be “Journal Entries”", async() => {
    let head = await page.$eval('h1', (header) => header.innerHTML); 
    expect(head).toBe("Journal Entries"); 
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it("Test13: On the home page the <body> element should not have any class attribute", async() => {
    let body_elem = await page.$eval("body", (e) => e.classList); 
    expect(body_elem[0]).toBeUndefined();  
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it("Test14: Verify the url is correct when clicking on the second entry", async() => {
    await page.$$eval("journal-entry", (entry) => entry[1].click());
    expect(page.url()).toMatch("/#entry2"); 
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it ("Test 15: Verify the title is current when clicking on the second entry", async() => {
    let head = await page.$eval('h1', (header) => header.innerHTML); 
    expect(head).toBe("Entry 2"); 
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it ("Test 16: Verify the entry page contents is correct when clicking on the second entry", async() => {
    let entry = await page.$$("journal-entry")
    let f_entry = await entry[1].getProperty('entry'); 
    let data = await f_entry.jsonValue(); 
    expect(data.title).toBe('Run, Forrest! Run!'); 
    expect(data.date).toBe('4/26/2021'); 
    expect(data.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get."); 
    expect(data.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg'); 
    expect(data.image.alt).toBe('forrest running'); 
  });

  // create your own test 17
  it("Test17: Clicking the back button once should bring the user back to the home page", async() => {
    await page.goBack(); 
    expect(page.url()).toBe("http://127.0.0.1:5500/"); 
  }); 
  // create your own test 18
  it("Test18: On the home page the <body> element should not have any class attribute", async() => {
    let body_elem = await page.$eval("body", (e) => e.classList); 
    expect(body_elem[0]).toBeUndefined();  
  });

  it("Test19: Verify the url is correct when clicking on the second entry", async() => {
    await page.$$eval("journal-entry", (entry) => entry[2].click());
    expect(page.url()).toMatch("/#entry3"); 
  });


  it ("Test 20: Verify the title is current when clicking on the second entry", async() => {
    let head = await page.$eval('h1', (header) => header.innerHTML); 
    expect(head).toBe("Entry 3"); 
  });
  
});
