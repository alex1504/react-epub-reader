import "./index.less"
import React from "react";
import { Drawer, IconButton } from '@mui/material';
import { Box } from "@material-ui/system";
import MenuIcon from '@mui/icons-material/Menu';

function Catalogue() {
  const [isDisplay, setDisplay] = React.useState(false);

  const toggleCatalogue = () => {
    setDisplay(!isDisplay)
  }

  return (
    <Box className="catalogue-box" sx={{ width: 250 }}>
      <IconButton className="catalogue-box__button" aria-label="ShowCatalogue" onClick={() => toggleCatalogue()}>
        <MenuIcon></MenuIcon>
      </IconButton>
      <Drawer
        anchor='left'
        open={isDisplay}
        onClose={() => { setDisplay(false) }}
      >
        111
      </Drawer>
    </Box>

  )
}

export default Catalogue
