import React, { Component } from 'react'
import { Image, Text, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export class ProductDetails extends Component {
    render() {
        const item = this.props.navigation.getParam("item")
        const { id, image, brandName, salePrice, price } = item;

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={image ? { uri: image } : null} style={{ width: wp('100%'), height: hp('40%') }} />
                <Text style={{ fontSize: hp('5%'), textAlign: 'center', marginTop: hp('5%') }}>{brandName}</Text>
                <Text style={{ fontSize: hp('2.5%'), lineHeight: 32, textAlign: 'center', marginTop: hp('5%') }}>This Pre-Owned Vacheron Constantin Overseas Chronograph 42mm with steel case, blue dial, steel bezel and blue leather strap is in excellent condition. Mechanized by Vacheron Constantin Calibre 1137 automatic movement. Includes box, extra blue rubber strap, papers and 12 months Timepiece 360 warranty.</Text>
            </ScrollView>
        )
    }
}