export interface WeatherInfo {
    name: string;
    weather: {
      description: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      sea_level: number;
    };
    wind: {
      speed: number;
    };
    visibility: number;
}


