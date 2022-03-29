import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get('backend-response.json', (req, res, ctx)=>{
    return res(
      ctx.status(200), //success
      ctx.json([ //Example API
        {
          "department": "Statistisches Bundesamt",
          "description": "Statistisches Bundesamt",
          "datasets": 2372
        },
        {
          "department": "Bundesministerium des Innern",
          "description": "Bundesministerium des Innern",
          "datasets": 722
        },
        {
          "department": "Bundesamt für Justiz",
          "description": "Bundesamt für Justiz",
          "datasets": 662
        },
        {
          "department": "mCLOUD",
          "description": "",
          "datasets": 648
        },
        {
          "department": "Bundesministerium für Bildung und Forschung",
          "description": "Bundesministerium für Bildung und Forschung",
          "datasets": 457
        },
        {
          "department": "Bundesministerium für Ernährung und Landwirtschaft",
          "description": "",
          "datasets": 141
        },
        {
          "department": "Bundesministerium für Familie, Senioren, Frauen und Jugend",
          "description": "",
          "datasets": 65
        },
        {
          "department": "Deutsches Patent- und Markenamt",
          "description": "",
          "datasets": 58
        },
        {
          "department": "Bundesministerium der Finanzen",
          "description": "",
          "datasets": 53
        },
        {
          "department": "Bundesministerium für Arbeit und Soziales",
          "description": "Bundesministerium für Arbeit und Soziales",
          "datasets": 32
        },
        {
          "department": "Bundesministerium für Wirtschaft und Energie",
          "description": "Bundesministerium für Wirtschaft und Energie",
          "datasets": 18
        },
        {
          "department": "Bundesanstalt für Arbeitsschutz und Arbeitsmedizin ",
          "description": "",
          "datasets": 15
        },
        {
          "department": "Bundesinstitut für Bau-, Stadt- und Raumforschung (BBSR) im Bundesamt für Bauwesen und Raumordnung (BBR)",
          "description": "",
          "datasets": 9
        },
        {
          "department": "Auswärtiges Amt",
          "description": "",
          "datasets": 7
        },
        {
          "department": "Generalzolldirektion",
          "description": "",
          "datasets": 5
        },
        {
          "department": "Bundesministerium der Verteidigung",
          "description": "",
          "datasets": 4
        },
        {
          "department": "Max Rubner-Institut",
          "description": "",
          "datasets": 2
        },
        {
          "department": "ITZ-Bund",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundeszentralamt für Steuern",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundesverwaltungsamt",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundesamt für Soziale Sicherung",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundessortenamt",
          "description": "Bundessortenamt",
          "datasets": 2
        },
        {
          "department": "Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundesausgleichsamt",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundesanstalt für Materialforschung und -prüfung ",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundesamt für Verbraucherschutz und Lebensmittelsicherheit",
          "description": "",
          "datasets": 2
        },
        {
          "department": "Bundesamt für Wirtschaft und Ausfuhrkontrolle",
          "description": "",
          "datasets": 1
        }
      ]
      )
    )
  })
)

beforeAll(()=> server.listen());
afterAll(()=> server.close());
afterEach(()=> server.resetHandlers())

describe('App', () => {

  it('renders App', () => {
    render(<App />);
    // screen.debug();
  });

  it('renders Doughnut', async () => {
    render(<App />);

    expect(await screen.findByTestId("doughnut")).toBeInTheDocument(); //doughnut
    // screen.debug();
  });

  it('renders BarChart', async () => {
    render(<App />);

    expect(await screen.findByTestId("barchart")).toBeInTheDocument(); //barchart
    // screen.debug();
  });

  it("filter shows initial values", async ()=>
  {
    render(<App />);
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(await screen.findByText(/27 items selected/)).toBeInTheDocument();

    // screen.debug();
  });

  it("filter updates items", async () => {
    render (<App/>);

    expect(await screen.findByText(/27 items selected/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('listbox'));

    fireEvent.click(await screen.findByText('mCLOUD'));
    fireEvent.click(await screen.findByText('ITZ-Bund'));
    fireEvent.click(await screen.findByText('Bundesamt für Verbraucherschutz und Lebensmittelsicherheit'));

    expect(await screen.findByText(/24 items selected/)).toBeInTheDocument();
    screen.debug();

  });

});