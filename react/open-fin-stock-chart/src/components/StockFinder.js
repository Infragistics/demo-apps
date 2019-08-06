/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';

import Win from './WinStyles';
import { StocksUtility } from "../tools/StocksUtility";

import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

// import * as IconArrow from '@material-ui/icons/Search';
import * as IconCancel from '@material-ui/icons/Cancel';
import * as IconArrow from '@material-ui/icons/KeyboardArrowDown';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

// import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
// import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// import createStyles from '@material-ui/core/styles/createStyles';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const styles = theme => ({
  root: {
    // background: "green",
    flexGrow: 1,
    // height: 25,
  },

  input: {
    display: 'flex',
    padding: 0,
    height: 22,
    fontSize: Win.FontSize,
  },
  valueContainer: {
    // background: "orange",
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    // margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    background: "pink",
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    // background: "red",
    // color: "white",
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    padding: 4,
    fontSize: Win.FontSize,
    color: "white",
  },
  singleValue: {
    // background: "green",
    fontSize: Win.FontSize,
    position: 'absolute',
    paddingLeft: 6,
    color: Win.Colors.Foreground,
  },
  placeholder: {
    position: 'absolute',
    left: 6,
    fontSize: Win.FontSize + 1,
    color: Win.Colors.Foreground,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    // width: `calc(100% - ${drawerWidth}px)`,
    width: `calc(100% - 25px)`,
  },
  paper: {
    // background: "gray",
    position: 'absolute',
    zIndex: 10000,
    // marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    fontSize: Win.FontSize,
    // height: 150,
    // maxHeight: 100,
    // overflow: 'hidden',
  },
  divider: {
    background: "red",
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}>
      {/* {props.children} */}
      Found no matching stock
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  // style={{background: "pink", marginTop: -5}}
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  // console.log("Option")
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        // fontWeight: props.isSelected ? 500 : 400,
        fontSize: Win.FontSize + 1,
        padding: 2,
        paddingLeft: 6,
        height: "auto",
        // background: "yellow",
        color: props.isSelected ? Win.Colors.Highlight : Win.Colors.Foreground,
      }}
      {...props.innerProps}
    >
      <div>
          <div style={{display: "inline-block", width: 50, textAlign: "right"}} >${props.data.price.toFixed(2)}</div>
          <div style={{display: "inline-block", width: 50, fontWeight: "Bold", marginLeft: 8}} >{props.data.symbol}</div>
          <div style={{display: "inline-block", width: `calc(100% - 80px)` }} >{props.data.name}</div>
      </div>
      {/* {props.children} */}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography  className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<IconCancel.default {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    //
    <Paper square
    style={{background: Win.Colors.Background }}
    // style={{background: "red" }}
    className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}
function IndicatorSeparator(props) {
  return (
  <div ></div>
  )
}

function DropdownIndicator(props) {
  return (
  // <div style={{background: "pink", height: 10, width: 10 }} ></div>
  // <IconArrow.default style={Win.Styles.Icon}/>
  <IconArrow.default style={{
    height: 20, width: 20,
    marginRight: 2, color: Win.Colors.Foreground }}/>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator,
  IndicatorSeparator,
};

class StockFinder extends React.Component {
// class StockFinder extends React.Component<WithStyles<typeof styles>> {

  state = {
    single: null,
    selectedItem: null,
    selectedSymbol: null,
    multi: null,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    // this.props.selectionChanged = this.props.selectionChanged.bind(this);
  }

  handleChange = name => stock => {
      if (stock && stock.symbol) {
          console.log("handleChange " + stock.symbol)
          this.setState({
            [name]: stock,
            // selectedItem: stock,
            // selectedSymbol: stock.symbol + "-" + stock.name,
          });
          this.props.onChange([stock.symbol]);
      } else {
          this.setState({
            [name]: stock,
            // selectedItem: stock,
          });
      }
  };

  render() {
    // const { classes, theme } = this.props;
    const { classes } = this.props;

    const selectStyles = {
      fontSize: Win.FontSize,
      input: base => ({
        ...base,
        // color: theme.palette.text.primary,
      marginLeft: 6,
      marginTop: 0,
      color: "white",
        // '& input': {
        //   font: 'inherit',
        // },
      }),
    };

    const stocks = StocksUtility.GetStockList();

    return (
        // <MuiThemeProvider theme={theme}>

      <div className={classes.root}>
        <NoSsr>
          {/* https://react-select.com/props */}
          <Select
            maxMenuHeight={100}
            classes={classes}
            styles={selectStyles}
            options={stocks}
            // options={suggestions}
            components={components}
            // value={this.state.selectedItem}
            value={null}
            onChange={this.handleChange('single')}
            placeholder="Search for stocks"
            isClearable={false}
          />
          {/* <div className={classes.divider} />
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Label',
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={suggestions}
            components={components}
            value={this.state.multi}
            onChange={this.handleChange('multi')}
            placeholder="Select multiple stocks"
            isMulti
          /> */}
        </NoSsr>
      </div>
        //  </MuiThemeProvider>
    );
  }
}

StockFinder.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(StockFinder);

// export default withRoot(withStyles(styles)(StockFinder));