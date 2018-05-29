import React from 'react'
import { View, Text, SectionList } from 'react-native'
import { connect } from 'react-redux'

import CategoryListItem from '../../components/CategoryListItem'

const mapState = state => ({
  categoryList: state.app.categoryList,
})

const mapDispatch = dispatch => ({
  fetchSystemProperty: dispatch.app.fetchSystemProperty,
})

class CategoryListScreen extends React.Component {
  static navigationOptions = {
    title: '選擇分台',
    headerBackTitle: '分台',
  }

  componentDidMount() {
    this.props.fetchSystemProperty()
    this.props.navigation.navigate('Category', { catId: 1 })
  }

  renderCategoryListItem = ({ item: category, index, section }) => (
    <CategoryListItem
      key={index}
      category={category}
      onPress={() => this.props.navigation.navigate('Category', { catId: category.cat_id })}
      isLastItem={(index + 1) === section.data.length}
    />
  )

  renderSectionHeader = ({ section: { name } }) => name && (
    <View style={{ backgroundColor: '#f5f7f9', paddingVertical: 8, paddingHorizontal: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{name}</Text>
    </View>
  )

  render() {
    const { categoryList } = this.props

    return (
      <View>
        <SectionList
          renderItem={this.renderCategoryListItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={categoryList}
          keyExtractor={item => item.cat_id}
        />
      </View>
    )
  }
}

export default connect(mapState, mapDispatch)(CategoryListScreen)