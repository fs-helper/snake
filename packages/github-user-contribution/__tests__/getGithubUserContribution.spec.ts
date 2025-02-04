import { getGithubUserContribution } from "..";

describe("getGithubUserContribution", () => {
  const promise = getGithubUserContribution("platane");

  it("should resolve", async () => {
    await promise;
  });

  it("should get colorScheme", async () => {
    const { colorScheme } = await promise;

    expect(colorScheme).toEqual([
      "#ebedf0",
      "#9be9a8",
      "#40c463",
      "#30a14e",
      "#216e39",
    ]);
  });

  it("should get around 365 cells", async () => {
    const { cells } = await promise;

    expect(cells.length).toBeGreaterThan(365);
    expect(cells.length).toBeLessThanOrEqual(365 + 7);
  });

  it("cells should have x / y coords representing to a 7 x (365/7) (minus unfilled last row)", async () => {
    const { cells, colorScheme } = await promise;

    expect(cells.length).toBeGreaterThan(300);
    expect(colorScheme).toEqual([
      "#ebedf0",
      "#9be9a8",
      "#40c463",
      "#30a14e",
      "#216e39",
    ]);

    const undefinedDays = Array.from({ length: Math.floor(365 / 7) })
      .map((x) => Array.from({ length: 7 }).map((y) => ({ x, y })))
      .flat()
      .filter(({ x, y }) => cells.some((c) => c.x === x && c.y === y));

    expect(undefinedDays).toEqual([]);
  });
});

it("should match snapshot for year=2019", async () => {
  expect(
    await getGithubUserContribution("platane", { year: 2019 })
  ).toMatchSnapshot();
});
