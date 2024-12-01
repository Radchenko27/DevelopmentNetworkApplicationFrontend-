export interface Driver {
    id: number;
    name: string;
    certificate_number: string;
    license: string;
    experience: number;
    characteristics: string;
    image_url: string | null;
    status: string;
  }
  export const mockData: Driver[] = [
    {
      id: 1,
      name: "Радченко Дмитрий Сергеевич",
      certificate_number: "32 12 344234",
      license: "B",
      experience: 2,
      image_url: null,
      characteristics: "лучший,",
      status: "active",
    },
    {
      id: 2,
      name: "Радченко Дмитрий Сергеевич",
      certificate_number: "32 12 344234",
      license: "B",
      experience: 2,
      image_url: null,
      characteristics: "лучший,",
      status: "active",
    },
    {
      id: 3,
      name: "Радченко Дмитрий Сергеевич",
      certificate_number: "32 12 344234",
      license: "B",
      experience: 2,
      image_url: null,
      characteristics: "лучший,",
      status: "active",
    },
  ];