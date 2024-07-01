import { PageTitle } from "~/components/page-title";
import { ColorPicker } from "~/components/colorpicker/colorpicker";

export default function Home() {
  return (
    <main>
      <PageTitle>Hello World</PageTitle>

      <h1>Hello World - Home page</h1>

      <ColorPicker />
    </main>
  );
}
