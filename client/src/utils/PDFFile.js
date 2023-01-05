import React, {useState, useEffect} from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import QRCode from 'react-qr-code';


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    height:200
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFFile = (props) => {
  const [data, setData] = useState({})

  useEffect(() => {
    setData(props.payment)
  }, [])
  // const {Apparetement, Date, Prix} = props.payment;
  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src={"/assets/syndic.png"} />
        <Text style={styles.header} fixed>h</Text>
        <Text style={styles.text}>
          Numero d'appartement : {data.Apparetement}
        </Text>
        <Text style={styles.text}>
          Date : {data.Date}
        </Text>
        <Text style={styles.text}>
          Prix: {data.Prix}
        </Text>
      </Page>
    </Document>
  );
};

export default PDFFile;
