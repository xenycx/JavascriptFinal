## Javascript-ის ფინალური დავალება - ტურნირი

### 1. **ტურნირის კლასის ინიციალიზაცია**
   - **`constructor()`**: 
     - ინიცირდება მოთამაშეთა ფერების სია `['yellow', 'green', 'red', 'blue']`.
     - შემოდის ტურნირის მიმდინარე რაუნდის ნომერი, რომელიც იწყება 1-დან.
     - ინიციალიზირდება ცარიელი სია `matches`, რომელიც შეინახავს ყველა მატჩის ინფორმაციას.
     - ინიციალიზირდება ცარიელი სია `usedColors`, რომ არ მოხდეს მოთამაშეების ერთნაირი ფერების გამოყენება.
     - იძახებს `setupInitialScreen` ფუნქციას საწყისი ეკრანის დასამზადებლად.

### 2. **საწყისი ეკრანი**
   - **`setupInitialScreen()`**:
     - იღებს საწყისი ეკრანის დაწყების ღილაკს (`#startBtn`) და ტურნირის ელემენტების კონტეინერს.
     - ღილაკის დაჭერისას,:
       - საწყისი ეკრანი ქრება.
       - ტურნირის ელემენტები აქტიურდება.
       - ინიციალიზირდება ტურნირის ფუნქცია `init()`.

### 3. **ტურნირის ინიციალიზაცია**
   - **`init()`**:
     - რაუნდის ნომერი კვლავ 1-ზე დგება.
     - მატჩების სია ცარიელდება.
     - ფერების გამოყენების სია ცარიელდება.
     - იძახებს `createMatches()` ფუნქციას მიმდინარე რაუნდის მატჩების შესაქმნელად.
     - მატჩების ჩვენებას ახდენს `render()` ფუნქციით.
     - ამატებს შემდეგი რაუნდის ღილაკის ფუნქციონალს `setupControls()`.

### 4. **მატჩების შექმნა**
   - **`createMatches()`**:
     - გამოთვლის მიმდინარე რაუნდის მატჩების რაოდენობას:
       - **პირველი რაუნდი**: 8 მატჩი.
       - **მეორე რაუნდი**: 4 მატჩი.
       - **მესამე რაუნდი**: 2 მატჩი.
       - **ფინალი**: 1 მატჩი.
     - თითოეულ მატჩში ირჩევს მოთამაშეების უნიკალურ ფერებს `getUniqueColor()` ფუნქციის გამოყენებით.
     - მოთამაშეების ინფორმაცია ინახება `matches` სიაში.

### 5. **უნიკალური ფერის შერჩევა**
   - **`getUniqueColor()`**:
     - ფერებს ფილტრავს ისე, რომ ისინი არ ემთხვეოდეს უკვე გამოყენებულ ფერებს და `excludeColor` პარამეტრს.
     - თუ ყველა ფერი უკვე გამოყენებულია, სიას განაახლებს.
     - შემთხვევით ირჩევს ფერს და აბრუნებს.

### 6. **მატჩების ჩვენება**
   - **`render()`**:
     - ეკრანზე აჩვენებს მიმდინარე რაუნდის ნომერს.
     - წაშლის წინა რაუნდის მატჩებს.
     - მატჩებს თანაბრად ნაწილდება მარცხენა და მარჯვენა სექციებზე.
     - თითოეული მატჩის ვიზუალიზაცია ხდება `createMatchElement()` ფუნქციით.

   - **`createMatchElement()`**:
     - ქმნის HTML ელემენტს, რომელიც აჩვენებს მოთამაშეების ფერებს და "VS"-ს.

### 7. **რაუნდის გაგრძელება**
   - **`progressRound()`**:
     - ამოწმებს, ფინალია თუ არა.
     - თუ ფინალია, აჩვენებს გამარჯვებულს `showWinner()`.
     - სხვაგვარად, რაუნდის ნომერს ზრდის და ახორციელებს ახალ მატჩებს.

### 8. **გამარჯვებულის ჩვენება**
   - **`showWinner()`**:
     - აჩვენებს გამარჯვებულის ფერს და "ხელახლა დაწყების" ღილაკს.
     - ღილაკის დაჭერისას თამაშს თავიდან ტვირთავს `restart()` ფუნქციით.

### 9. **დამხმარე ფუნქციები**
   - **`createElement()`**:
     - HTML ელემენტების შექმნის ფუნქცია, რომელიც საშუალებას აძლევს მარტივად შექმნას ტურნირის ვიზუალური კომპონენტები.