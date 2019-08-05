import WorldCities from "./WorldCities";

export default class DataUtil {

    public static Locations: any[] = WorldCities.getMajorCities();

    public static getEmployees(count?: number): any[] {

        console.log("DataUtil... " + this.Locations.length);

        if (count === undefined) {
            count = 100;
        }

        const employees: any[] = [];
        for (let i = 0; i < count; i++) {

            const person = this.getPerson(i);
            person.Title = this.getRandomItem(this.salesTitles);
            person.Salary = this.getRandomNumber(40, 200) * 1000;
            person.ID = i;

            if (person.Salary < 50000) {
                person.Income = "Low";
            } else if (person.Salary < 100000) {
                person.Income = "Average";
            } else {
                person.Income = "High";
            }

            person.Sales = [];
            const maxLocations = this.getRandomNumber(20, this.Locations.length - 50);

            for (let ii = 0; ii < maxLocations; ii++) {
                const location = this.Locations[ii];

                const sale: any = {};
                sale.CountryFlag = this.getCountryFlag(location.Country);
                sale.CountryName = location.Country.replace("-", " ");
                sale.City = location.City;
                sale.Region = location.Region;
                sale.Lon = location.Lon;
                sale.Lat = location.Lat;
                sale.ID = this.pad(ii + 1, 4);

                sale.OrderDate  = this.getRandomDate();
                sale.OrderValue = this.getRandomNumber(20, 99) * 1000;
                sale.OrderCount = this.getRandomNumber(10, 99);
                sale.OrderPrice = sale.OrderValue / sale.OrderCount;

                person.Sales.push(sale);
            }
            employees.push(person);
        }
        return employees;
    }

    public static getLocation(id: number): any {
        const street: string = this.getRandomStreet();
        const location: any = this.getRandomItem(this.Locations);
        location.ID = this.pad(id + 1, 4);
        location.Street = this.getRandomStreet();
        location.Address = street + "," + location.City;
        location.CountryFlag = this.getCountryFlag(location.Country);
        location.CountryName = location.Country.replace("-", " ");
        return location;
    }

    public static getPerson(id: number): any {
        const age: number = Math.round(this.getRandomNumber(20, 40));
        const gender: string = this.getRandomGender();
        const firstName: string = this.getRandomNameFirst(gender);
        const lastName: string = this.getRandomNameLast();
        let photoPath: string;
        if (gender === "male") {
            photoPath = this.getPhotoMale((id % 25) + 1);
        } else {
            photoPath = this.getPhotoFemale((id % 25) + 1);
        }

        const location: any = this.getLocation(id);
        const person: any = {};
        person.ID = location.ID;
        person.Street = location.Street;
        person.Address = location.Address;
        person.City = location.City;
        person.CountryFlag = location.CountryFlag;
        person.CountryName = location.CountryName;

        person.Age = age;
        person.Birthday = this.getBirthday(age);
        person.Gender = this.getGenderPhoto(gender);
        person.Email = this.getRandomEmail(firstName, lastName);
        person.FirstName = firstName;
        person.LastName = lastName;
        person.Name = firstName + " " + lastName;
        person.Phone = this.getRandomPhone();
        person.Avatar = photoPath;

        return person;
    }

    private static emails: string[] = [ "gmail.com", "sales.com"];
    private static genders: string[] = ["male", "female"];
    private static maleNames: string[] = ["Kyle", "David", "Sam", "Ralph", "Mike", "Bill", "Frank", "Howard", "Jack", "Larry", "Pete", "Steve", "Vince", "Mark", "Alex", "Max", "Brian", "Martin", "Chris", "Andrew", "Martin", "Mike", "Steve", "Glenn", "Bruce"];
    private static femaleNames: string[] = ["Gina", "Pamela", "Irene", "Katie", "Brenda", "Casey", "Zooey", "Holly", "Kate", "Liz", "Pamela", "Nelly", "Marisa", "Monica", "Anna", "Jessica", "Sofia", "Isabella", "Margo", "Jane", "Audrey", "Sally", "Melanie", "Greta", "Aurora", "Sally"];
    private static lastNames: string[] = ["Adams", "Crowley", "Ellis", "Martinez", "Irvine", "Maxwell", "Clark", "Owens", "Rodriguez", "Lincoln", "Thomas", "Wild", "Oscar", "King", "Newton", "Fitzgerald", "Holmes", "Jefferson", "Landry", "Strong", "Perez", "Spencer", "Stark", "Carter", "Edwards", "Stark", "Johnson", "Fitz", "Chief", "Blanc", "Perry", "Stone", "Williams", "Lane", "Jobs", "Adama", "Power", "Tesla"];
    private static roadSuffixes: string[] = ["Road", "Street", "Way"];
    private static roadNames: string[] = ["Main", "Garden", "Broad", "Oak", "Cedar", "Park", "Pine", "Elm", "Market", "Hill"];
    private static salesTitles: string[] = [
    "Account Manager", "Sales Associate",
    "Sales Director", "Sales Consultant",
    "Sales VP", "Region Manager"];

    private static getRandomNumber(min: number, max: number): number {
        return Math.round(min + Math.random() * (max - min));
    }

    private static getRandomItem(array: any[]): any {
        const index = Math.round(this.getRandomNumber(0, array.length - 1));
        return array[index];
    }

    private static getRandomDate(start?: Date, end?: Date) {
        const today: Date = new Date();
        if (end === undefined) {
            end = today;
        }
        if (start === undefined) {
            start = new Date(today.getFullYear() - 2, 1, 1);
        }
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    private static getRandomPhone(): string {
        const phoneCode = this.getRandomNumber(100, 900);
        const phoneNum1 = this.getRandomNumber(100, 900);
        const phoneNum2 = this.getRandomNumber(1000, 9000);
        const phone = phoneCode + "-" + phoneNum1 + "-" + phoneNum2;
        return phone;
    }

    private static getRandomGender(): string {
        return this.getRandomItem(this.genders);
    }

    private static getRandomNameLast(): string {
        return this.getRandomItem(this.lastNames);
    }

    private static getRandomNameFirst(gender: string): string {
        if (gender === "male") {
            return this.getRandomItem(this.maleNames);
        }
        else {
            return this.getRandomItem(this.femaleNames);
        }
    }

    private static getRandomEmail(first: string, last: string): string {
        const name: string = first.toLowerCase().substr(0,1) + last.toLowerCase();
        return name + "@" + this.getRandomItem(this.emails);
    }

    private static getRandomStreet(): string {
        const num = Math.round(this.getRandomNumber(100, 300)).toString();
        const road = this.getRandomItem(this.roadNames);
        const suffix = this.getRandomItem(this.roadSuffixes);
        return num + " " + road + " " + suffix;
    }

    private static getBirthday(age: number): Date {
        const today: Date = new Date();
        const year: number = today.getFullYear() - age;
        const month: number = this.getRandomNumber(0, 8);
        const day: number = this.getRandomNumber(10, 27);
        return new Date(year, month, day);
    }

    private static getPhotoMale(id: number): string {
        return require('../assets/people/GUY' + this.pad(id, 2) + '.png');
    }

    private static getPhotoFemale(id: number): string {
        return require('../assets/people/GIRL' + this.pad(id, 2) + '.png');
    }

    private static getGenderPhoto(gender: string): string {
        return require('../assets/genders/' + gender + '.png');
    }

    private static getCountryFlag(country: string): string {
        return require('../assets/flags/' + country + '.png');
    }

    private static pad(num: number, size: number) {
        let s = num + "";
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }

}