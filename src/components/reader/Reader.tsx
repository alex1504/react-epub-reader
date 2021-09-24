import Catalogue from "../catalogue/Catalogue"
import ContentView from "../contentView/ContentView"
import Panel from "../panel/Panel"

function Reader() {
  return (
    <div>
      <Catalogue></Catalogue>
      <ContentView></ContentView>
      <Panel></Panel>
    </div>
  )
}

export default Reader
