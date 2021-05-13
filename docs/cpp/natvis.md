---
Order:
Area: cpp
TOCTitle: Natvis framework
ContentId: F684A0E8-0AEB-4CA9-83E2-891CC012EA8B
PageTitle: The Natvis framework provides custom views for native C++ objects
DateApproved: 07/25/2019
MetaDescription: Learn how the Natvis framework provides custom views for native C++ objects in Visual Studio Code
---
# Natvis: Custom views for native objects

The [Natvis](https://docs.microsoft.com/visualstudio/debugger/create-custom-views-of-native-objects) framework allows developers to write custom schemas to help visualize native objects.

For gdb/lldb debugging (`type": "cppdbg`), a subset of the Natvis framework has been ported to the C/C++ extension and the code resides in the [MIEngine](https://github.com/microsoft/MIEngine) shared component. If additional features that are not implemented are requested, please [file an issue](https://github.com/microsoft/MIEngine/issues) on the MIEngine GitHub page with details of what is missing.

For Microsoft C++ debugging (`type": "cppvsdbg`), the debugger contains the full implementation of the Natvis framework as Visual Studio.

## Documentation

The official Natvis documentation is located at [Create custom views of C++ objects in the debugger](https://docs.microsoft.com/visualstudio/debugger/create-custom-views-of-native-objects).

## Schema

The Natvis schema is provided here for convenience:

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema targetNamespace="http://schemas.microsoft.com/vstudio/debugger/natvis/2010" xmlns="http://schemas.microsoft.com/vstudio/debugger/natvis/2010" attributeFormDefault="unqualified" elementFormDefault="qualified"
           xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- Definition of complex named types-->

  <xs:simpleType name="GuidType">
    <xs:annotation>
      <xs:documentation>Values of this type will look like: "01234567-89AB-CDEF-0123-456789ABCDEF" or "{01234567-89AB-CDEF-0123-456789ABCDEF}".</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:pattern value="[{(]?[0-9A-Fa-f]{8}\-?[0-9A-Fa-f]{4}\-?[0-9A-Fa-f]{4}\-?[0-9A-Fa-f]{4}\-?[0-9A-Fa-f]{12}[})]?"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="CppIdType">
    <xs:annotation>
      <xs:documentation>A valid C++ identifier.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:pattern value="[a-zA-Z$_][a-zA-Z$_0-9]*" />
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="StringType">
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="MaxItemsPerViewType">
    <xs:annotation>
      <xs:documentation>
        Specifies the maximum number of collection items that can be displayed at one time. If the number of items in the collection
        exceeds this limit, a special node will be created at the end, which can be expanded to show additional items.

        The precise cutoff for the maximum number of items to show in a view is a tuning parameter. While a higher number allow more items
        to be visible at one time, a lower number will improve the performance of Visual Studio when a custom list object is expanded. In general,
        the more complicated the traversal logic, the smaller the number of items per view needs to be in order to keep the IDE responsive.

        The maximum number of items per view must be between 1 and 50,000. A default value of 5,000 items will be used if this attribute is not specified.
      </xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:unsignedInt">
      <xs:minInclusive value="1" />
      <xs:maxInclusive value="50000" />
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="ConditionType">
    <xs:annotation>
      <xs:documentation>Specifies the condition under which this element is active. The expression should produce a boolean value when evaluated.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="OptionalType">
    <xs:annotation>
      <xs:documentation>
        Specifies whether the element is optional. An optional element that fails to parse allows the remainder of the elements in the enclosing &lt;Type&gt; entry
        to be used. A mandatory element that fails to parse will cause the entire enclosing &lt;Type&gt; element to be invalidated. All elements are assumed, by default, to be mandatory,
        unless Optional=&quot;true&quot; is specified.
      </xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:boolean">
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="ViewIncludeType">
    <xs:annotation>
      <xs:documentation>
        Specifies a semi-colon-delimited list of views in which this element should be shown. The view of the object is controlled
        via the ,view(&lt;name&gt;) format specifier.
      </xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="ViewExcludeType">
    <xs:annotation>
      <xs:documentation>
        Specifies a semi-colon-delimited list of views in which this element should be hidden. The view of the object is controlled
        via the ,view(&lt;name&gt;) format specifier.
      </xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="TypeNameType">
    <xs:annotation>
      <xs:documentation>Specifies the fully qualified name of the type to be visualized. If the type is a template class, it might contain '*' as a wildcard character for template parameters. Primitive data type names are only allowed with UIVisualizer definitions.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="ModuleNameStringType">
    <xs:annotation>
      <xs:documentation>Specifies the name of a module. It should include just the module name and no absolute or relative paths.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
      <xs:pattern value="([^\\^//])+"/>
      <!-- Prevent absolute or relative pathing, just the module name only-->
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="VersionStringType">
    <xs:annotation>
      <xs:documentation>1.2.3.4 or 1.2 are acceptable.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:string">
      <xs:pattern value="([0-9])+\.([0-9])+(\.([0-9])+\.([0-9])+)?"/>
      <!--1.2.3.4 or 1.2 are acceptable -->
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="AlternativeHResultType">
    <xs:annotation>
      <xs:documentation>Specifies an alternative HRESULT which will share the same visualizer.</xs:documentation>
    </xs:annotation>
    <xs:attribute name="Name" type="TypeNameType" use="required"/>
  </xs:complexType>

  <xs:complexType name="IntrinsicParameterType">
    <xs:annotation>
      <xs:documentation>Specifies the type of the parameter to the given intrinsic function.</xs:documentation>
    </xs:annotation>
    <xs:attribute name="Type" type="StringType" use="required" />
    <xs:attribute name="Name" type="CppIdType"  use="optional">
      <xs:annotation>
        <xs:documentation>If an expression is provided, specifies the name by which the expression can refer to the parameter. If the function is implemented via a debugger extension,
        this attribute may be omitted.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="IntrinsicType">
    <xs:annotation>
      <xs:documentation>Describes a custom intrinsic function that can be called from an expression. An &lt;Intrinsic&gt; element must be
        accompanied by a debugger component that implements the function through the IDkmIntrinsicFunctionEvaluator140 interface.
      </xs:documentation>
    </xs:annotation>
    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:element name="Parameter" minOccurs="0" maxOccurs="unbounded" type="IntrinsicParameterType"></xs:element>
    </xs:choice>
    <xs:attributeGroup ref="CommonAttributes_NoCondition_NoView" />
    <xs:attribute name="Name" type="CppIdType" use="required">
      <xs:annotation>
        <xs:documentation>The name of the intrinsic function. This must be a valid C++ identifier.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="Category" type="IconType" use="optional">
      <xs:annotation>
        <xs:documentation>Specifies which category icon should be assigned to the results of expressions that invoke this function. This controls which icon is used
        in the watch window for expressions that call the function. The default category value is 'Method'.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="ReturnType" type="StringType" use="optional">
      <xs:annotation>
        <xs:documentation>The return type of the intrinsic function. The return type may be omitted if an expression is provided (the type of the expression will imply the return type).</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="Expression" type="StringType" use="optional">
      <xs:annotation>
        <xs:documentation>
          Expression that evaluates to the return value of the function.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="SourceId" type="GuidType" use="optional">
      <xs:annotation>
        <xs:documentation>Specifies the source id used to identify the debugger component that implements the function. This must match the filter constraints of the IDkmIntrinsicFunctionEvaluator140 implementation.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="LanguageId" type="GuidType" use="optional">
      <xs:annotation>
        <xs:documentation>Specifies the language id used to identify the debugger component that implements the function. This must match the filter constraints of the IDkmIntrinsicFunctionEvaluator140 implementation.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="Id" type="xs:unsignedInt" use="optional">
      <xs:annotation>
        <xs:documentation>Specifies unique id for this function, given the source id and language id. It is used by the implementing component to determine which function was called
        if it implements multiple intrinsic functions.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="SideEffect" type="xs:boolean" use="optional">
      <xs:annotation>
        <xs:documentation>If true, indicates that this function may cause side effects. If true, calls to this function will be disabled
        in scenarios where unexpected side effects may be confusing to the user. Functions that modify state, either inside the debuggee or inside Visual Studio, should set this to true.
        By default, this value is false.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="Varargs" type="xs:boolean" use="optional">
      <xs:annotation>
        <xs:documentation>
          If true, indicates that this function is a varargs function, and that additional arguments can be passed after the explicitly-listed parameters. Default is false.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="AlternativeTypeType">
    <xs:annotation>
      <xs:documentation>Specifies an alternative type which will share the same visualizer.</xs:documentation>
    </xs:annotation>
    <xs:attribute name="Name" type="TypeNameType" use="required"/>
    <xs:attribute name="Priority" type="PriorityType" use="optional" />
    <xs:attribute name="Inheritable" type="xs:boolean" use="optional">
      <xs:annotation>
        <xs:documentation>
          True if this visualizer may be used by objects of classes derived from the given type, false if an object must be directly of this type for the visualizer to take effect.
          Default is true.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="VersionType">
    <xs:annotation>
      <xs:documentation>Specifies a matching module name and version for this visualizer.</xs:documentation>
    </xs:annotation>
    <xs:attribute name="Name" type="ModuleNameStringType" use="required" />
    <xs:attribute name="Min" type="VersionStringType" use="optional">
      <xs:annotation>
        <xs:documentation>Specifies the minimum (inclusive) version number. </xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="Max" type="VersionStringType" use="optional">
      <xs:annotation>
        <xs:documentation>Specifies the maximum (inclusive) version number. </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>
  <!-- Attributes for elements that support filtering by view-->
  <xs:attributeGroup name="ViewConstraints">
    <xs:attribute name="IncludeView" type ="ViewIncludeType" use="optional" />
    <xs:attribute name="ExcludeView" type ="ViewExcludeType" use="optional" />
  </xs:attributeGroup>

  <xs:attributeGroup name="CommonAttributes_NoCondition_NoView">
    <xs:attribute name="ModuleName" type="ModuleNameStringType" use="optional" />
    <xs:attribute name="ModuleVersionMin" type="VersionStringType" use="optional" />
    <xs:attribute name="ModuleVersionMax" type="VersionStringType" use="optional" />
    <xs:attribute name="Optional" type="OptionalType" use="optional" />
  </xs:attributeGroup>

  <xs:attributeGroup name="CommonAttributes_NoCondition">
    <xs:attributeGroup ref="CommonAttributes_NoCondition_NoView" />
    <xs:attributeGroup ref="ViewConstraints" />
  </xs:attributeGroup>

  <!-- These attributes are shared by all top-level natvis elements (DisplayString/StringView/top-level children of Expand)-->
  <xs:attributeGroup name="CommonAttributes">
    <xs:attributeGroup ref="CommonAttributes_NoCondition" />
    <xs:attribute name="Condition" type="ConditionType" use="optional" />
  </xs:attributeGroup>

  <xs:complexType name="DisplayStringType">
    <xs:annotation>
      <xs:documentation>Specifies the string to be shown as the value of objects of the visualized type. It accepts arbitrary strings mixed with expressions. Everything inside curly braces (for example, { and }) is interpreted as an expression and gets evaluated. To escape a curly brace, you can type two curly braces (for example, \{{ or }}).</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attributeGroup ref="CommonAttributes" />
        <xs:attribute name="LegacyAddin" type="StringType" use="optional">
          <xs:annotation>
            <xs:documentation>If a legacy add-in exists, specifies the dll of the legacy addin. If a full path isn't specified, Visual Studio will look in the visualizer directory next to the .natvis file that specified the add-in. A regular display string is still allowed in conjunction with an add-in, and will be used as a fallback if the add-in dll cannot be loaded.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Export" type="StringType" use="optional">
          <xs:annotation>
            <xs:documentation>If a legacy add-in exists, specifies the name of the export for the legacy add-in implementation. This attribute is valid only if 'LegacyAddin' is also specified.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Encoding" type="EncodingType" use="optional">
          <xs:annotation>
            <xs:documentation>Specifies the encoding of the string returned by the legacy addin. Default is Utf8. This attribute is valid only if 'LegacyAddin' is also specified.
            </xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:simpleType name="EncodingType">
    <xs:restriction base="xs:normalizedString">
      <xs:enumeration value="Ansi" />
      <xs:enumeration value="Utf8" />
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="CustomVisualizerType">
    <xs:annotation>
      <xs:documentation>Specifies a visualizer add-in which customizes the debugger view of this object.</xs:documentation>
    </xs:annotation>
    <xs:attribute name="VisualizerId" type="GuidType" use="required"/>
    <xs:attributeGroup ref="CommonAttributes" />
  </xs:complexType>

  <xs:complexType name="StringViewType">
    <xs:annotation>
      <xs:documentation>Specifies the expression whose value is sent to the built-in text visualizers.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="CommonAttributes" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="IndexNodeType">
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attribute name="Condition" type="ConditionType" use="optional" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:attributeGroup name="NameAttribute">
  <xs:attribute type="xs:string" name="Name" use="optional">
    <xs:annotation>
      <xs:documentation>
        Specifies an optional name, in &lt;DisplayString&gt; syntax, for this node. If omitted, the name
        of the node will be the index of the item in the tree traversal. Expressions in curly braces
        are evaluated in the context of the node.
      </xs:documentation>
    </xs:annotation>
  </xs:attribute>
  </xs:attributeGroup>
  <xs:complexType name="ListItemsNodeType">
    <xs:annotation>
      <xs:documentation>Expression that points to value of the linked list node. It can be left empty or have 'this' to refer to the linked list node itself. This expression is evaluated under the context of the linked list node and not the parent linked list type.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="NameAttribute" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="TreeItemsNodeType">
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attribute name="Condition" type="ConditionType" use="optional" />
        <xs:attributeGroup ref="NameAttribute" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="ItemType">
    <xs:annotation>
      <xs:documentation>Specifies a single child element. It only accepts expressions and no arbitrary strings. If the expression produces a complex type value, the child node itself can be expanded by the user.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attribute name="Name" type="StringType" use="required">
          <xs:annotation>
            <xs:documentation>Name of the child element as it will be shown under the name column in the debugger variable windows.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attributeGroup ref="CommonAttributes" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="ExpandedItemType">
    <xs:annotation>
      <xs:documentation>Specifies a child element whose children will be shown as the children of the current node. Use when you need to generate a flat view of a type when expanded.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="CommonAttributes" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:simpleType name="ArrayDirectionType">
    <xs:annotation>
      <xs:documentation>Specifies how the multi-dimensional array indices should be unrolled. Use 'Forward' for row-major arrays and 'Backward' for column-major arrays.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:normalizedString">
      <xs:enumeration value="Forward"/>
      <xs:enumeration value="Backward"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="IconType">
    <xs:restriction base="xs:normalizedString">
      <xs:enumeration value="Data">
        <xs:annotation>
          <xs:documentation>
            Indicates that the item should use the icon associated with general data.
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Method">
        <xs:annotation>
          <xs:documentation>
            Indicates that the item should use the icon associated with method calls.
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Property">
        <xs:annotation>
          <xs:documentation>
            Indicates that the item should use the icon associated with properties.
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="ExpandType">
    <xs:annotation>
      <xs:documentation>Specifies the list of child elements to be shown when a variable of the visualized type is expanded in the debugger windows.</xs:documentation>
    </xs:annotation>
    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:element name="Item" minOccurs="0" maxOccurs="unbounded" type="ItemType" />
      <xs:element name="ArrayItems" minOccurs="0" maxOccurs="unbounded" type="ArrayItemsType" />
      <xs:element name="IndexListItems" minOccurs="0" maxOccurs="unbounded" type="IndexListItemsType" />
      <xs:element name="LinkedListItems" minOccurs="0" maxOccurs="unbounded" type="LinkedListItemsType" />
      <xs:element name="TreeItems" minOccurs="0" maxOccurs="unbounded" type="TreeItemsType" />
      <xs:element name="ExpandedItem" minOccurs="0" maxOccurs="unbounded" type="ExpandedItemType" />
      <xs:element name="Synthetic" minOccurs="0" maxOccurs="unbounded" type="SyntheticItemType" />
      <xs:element name="CustomListItems" minOccurs="0" maxOccurs="unbounded" type="CustomListItemsType" />
    </xs:choice>
    <xs:attribute name="HideRawView" type="xs:boolean">
      <xs:annotation>
        <xs:documentation>Specifies whether or not the "[Raw View]" node for this object should be hidden. By default, this attribute is set to 'false',
        which will result in the raw view node of the current object visible to the user.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="CustomListItemsType">
    <xs:annotation>
      <xs:documentation>Specifies custom logic for iterating through a collection which cannot be visualized by other means.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:element name="Variable" minOccurs="0" maxOccurs="unbounded" type="VariableType"></xs:element>
      </xs:choice>
      <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:element name="Size" minOccurs="1" maxOccurs="1" type="CustomListSizeType">
        </xs:element>
      </xs:choice>
      <xs:choice minOccurs="0" maxOccurs="1">
        <xs:element name="Skip" minOccurs="1" maxOccurs="1" type="SkipType"></xs:element>
      </xs:choice>
      <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:group ref ="CustomListCode" />
      </xs:choice>
    </xs:sequence>
    <xs:attributeGroup ref="CommonAttributes" />
    <xs:attribute name="MaxItemsPerView" type="MaxItemsPerViewType" use="optional">
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="SkipType">
    <xs:annotation>
      <xs:documentation>
        Specifies logic to skip a specified number of items in the collection. The skip logic is invoked
        when the user scrolls in the watch window in order to quickly navigate the collection traversal down to the desired point. After the skip logic,
        control will return to be start of the execution, but with iteration variables modified as needed to reflect the updated state.

        The &lt;Skip&gt; element exist as an optional performance optimization to allow the collection traversal to skip through large numbers
        of items quickly. If a &lt;Skip&gt; element is not specified, the expression evaluator will run the traversal logic when it needs to do
        a skip until the desired number of &lt;Item&gt; elements have executed. Depending on the data structure of the underlying collection,
        this may involve a significant amount of unnecessary computation.
      </xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode_NoItem" />
    </xs:choice>

    <xs:attribute name="Value" type="CppIdType" use="required">
      <xs:annotation>
        <xs:documentation>
          Name of the variable specifying the number of items to skip, as an unsigned 32-bit integer. If a &lt;Size&gt; element is specified,
          the expression evaluator will never pass in a skip value that would cause the current index of the traversal to exceed the bounds of the collection.
          If no &lt;Size&gt; element is specified, the skip value may be any arbitrary integer, and it is the responsibility of the &lt;Skip&gt; logic
          to do any bounds checking necessary. In the event that it is not possible to skip over the full number of items requested, the &lt;Skip&gt; logic
          should modify the value to the skip variable so that when execution completes, it contains the actual number of items skipped.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="CustomListSizeType">
    <xs:annotation>
      <xs:documentation>Specifies the total number of items in the collection.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attribute name="Condition" type="ConditionType" use="optional" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:group name="CustomListCode_NoItem">
    <xs:choice>
      <!-- For the sake of simplifying implementation, I am not implementing declaring variables inside of an 'loop' block
           until I encounter a scenario that requires it.-->
      <!--<xs:element name="Variable" minOccurs="0" maxOccurs="unbounded" type="VariableType"></xs:element>-->
      <xs:element name="Loop" minOccurs="0" maxOccurs="unbounded" type="LoopType_NoItem"></xs:element>
      <xs:sequence minOccurs="0" maxOccurs="unbounded">
        <xs:element name="If" minOccurs="1" maxOccurs="1" type="IfType_NoItem"></xs:element>
        <xs:element name="Elseif" minOccurs="0" maxOccurs="unbounded" type="IfType_NoItem"></xs:element>
        <xs:element name="Else" minOccurs="0" maxOccurs="1" type="ElseType_NoItem"></xs:element>
      </xs:sequence>
      <xs:element name="Exec" minOccurs="0" maxOccurs="unbounded" type="ExecType"></xs:element>
      <xs:element name="Break" minOccurs="0" maxOccurs="unbounded" type="BreakType"></xs:element>
    </xs:choice>
  </xs:group>

  <xs:group name="CustomListCode">
    <xs:choice>
      <!-- For the sake of simplifying implementation, I am not implementing declaring variables inside of an 'loop' block
          until I encounter a scenario that requires it.-->
      <!--<xs:element name="Variable" minOccurs="0" maxOccurs="unbounded" type="VariableType"></xs:element>-->
      <xs:element name="Loop" minOccurs="0" maxOccurs="unbounded" type="LoopType"></xs:element>
      <xs:sequence minOccurs="0" maxOccurs="unbounded">
        <xs:element name="If" minOccurs="1" maxOccurs="1" type="IfType"></xs:element>
        <xs:element name="Elseif" minOccurs="0" maxOccurs="unbounded" type="IfType"></xs:element>
        <xs:element name="Else" minOccurs="0" maxOccurs="1" type="ElseType"></xs:element>
      </xs:sequence>
      <xs:element name="Exec" minOccurs="0" maxOccurs="unbounded" type="ExecType"></xs:element>
      <xs:element name="Break" minOccurs="0" maxOccurs="unbounded" type="BreakType"></xs:element>
      <xs:element name="Item" minOccurs="0" maxOccurs="unbounded" type="CustomListItemType"></xs:element>
    </xs:choice>
  </xs:group>

  <xs:attributeGroup name="CustomListCode_Attributes">
    <xs:attribute name="Condition" type="ConditionType" use="optional">
      <xs:annotation>
        <xs:documentation>Condition controlling whether this element and inner elements should execute</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attributeGroup ref="CustomListCode_Attributes_NoCondition" />
  </xs:attributeGroup>

  <!-- Defines attributes that do on custom list code elements besides the condition. Currently, this is empty, but maintaining the group
  as a placeholder in case we decide to add something to it later. -->
  <xs:attributeGroup name="CustomListCode_Attributes_NoCondition">
  </xs:attributeGroup>

  <xs:complexType name="LoopType_NoItem">
    <xs:annotation>
      <xs:documentation>Specifies a block of instructions which will only execute multiple times until a &lt;Break&gt; element is encountered, or an expression fails to evaluate.</xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode_NoItem" />
    </xs:choice>

    <xs:attributeGroup ref="CustomListCode_Attributes" />
  </xs:complexType>


  <xs:complexType name="LoopType">
    <xs:annotation>
      <xs:documentation>Specifies a block of instructions which will only execute multiple times until a &lt;Break&gt; element is encountered, or an expression fails to evaluate.</xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode" />
    </xs:choice>

    <xs:attributeGroup ref="CustomListCode_Attributes" />
  </xs:complexType>

  <xs:complexType name="IfType_NoItem">
    <xs:annotation>
      <xs:documentation>Specifies a block of instructions which will only execute if a condition is true.</xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode_NoItem" />
    </xs:choice>

    <xs:attributeGroup ref="CustomListCode_Attributes" />
  </xs:complexType>

  <xs:complexType name="IfType">
    <xs:annotation>
      <xs:documentation>Specifies a block of instructions which will only execute if a condition is true.</xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode" />
    </xs:choice>

    <xs:attributeGroup ref="CustomListCode_Attributes" />
  </xs:complexType>

  <xs:complexType name="ElseType_NoItem">
    <xs:annotation>
      <xs:documentation>Specifies a block of instructions which will only execute if a condition is true.</xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode_NoItem" />
    </xs:choice>

    <xs:attributeGroup ref="CustomListCode_Attributes_NoCondition" />
  </xs:complexType>

  <xs:complexType name="ElseType">
    <xs:annotation>
      <xs:documentation>Specifies a block of instructions which will only execute if a condition is true.</xs:documentation>
    </xs:annotation>

    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:group ref="CustomListCode" />
    </xs:choice>

    <xs:attributeGroup ref="CustomListCode_Attributes_NoCondition" />
  </xs:complexType>

  <xs:complexType name="VariableType">
    <xs:annotation>
      <xs:documentation>
        Declares a variable for use in future expressions with the &lt;CustomListItems&gt; block.
      </xs:documentation>
    </xs:annotation>
    <xs:attribute name="Name" type="CppIdType" use="required">
      <xs:annotation>
        <xs:documentation>Name of the variable.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="InitialValue" type="StringType" use="required">
      <xs:annotation>
        <xs:documentation>
          Expression evaluating to the initial value of the variable.
          This expression also specifies the type of the variable. Initial value expressions may make use of other variables already defined.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="ExecType">
    <xs:annotation>
      <xs:documentation>
        Executes a single expression. The expression executes in the context of the object, but may use iteration variables.
        The expression may also modify iteration variables, but no other side effects are allowed.
      </xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attributeGroup ref="CustomListCode_Attributes" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="CustomListItemType">
    <xs:annotation>
      <xs:documentation>Generates a child item obtained by evaluating the given expression.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="CustomListCode_Attributes" />
        <xs:attribute name="Name" type="xs:string" use="optional">
          <xs:annotation>
            <xs:documentation>
              Specifies an optional name to use for the item. The name is provided in &lt;DisplayString&gt; syntax and may contain embedded expressions.
              If no name is provided a default name will be used in the form &quot;[i]&quot;, where 'i' is the index representing the order in which the item was returned.
            </xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="BreakType">
    <xs:annotation>
      <xs:documentation>Breaks out of the innermost &lt;Loop&gt; element. A &lt;Break&gt; element outside of a loop will terminate iteration of the collection.</xs:documentation>
    </xs:annotation>
    <xs:attributeGroup ref="CustomListCode_Attributes" />
  </xs:complexType>

  <xs:complexType name="SyntheticItemType">
    <xs:annotation>
      <xs:documentation>Specifies a child element whose value is not backed by an expression. The value of the item can be specified using a 'DisplayString' element. The children of the item can be specified using an 'Expand' element.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="0" maxOccurs="unbounded" name="CustomVisualizer" type="CustomVisualizerType" />
      <xs:element minOccurs="0" maxOccurs="unbounded" name="DisplayString" type="DisplayStringType"/>
      <xs:element minOccurs="0" maxOccurs="unbounded" name="StringView" type="StringViewType"/>
      <xs:element minOccurs="0" name="Expand" type="ExpandType"/>
    </xs:sequence>
    <xs:attribute name="Name" type="StringType" use="required">
      <xs:annotation>
        <xs:documentation>Name of the child element as it will be shown under the name column in the debugger windows.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="Expression" type="StringType" use="optional">
      <xs:annotation>
        <xs:documentation>Expression that will be used to retrieve the value of the item when the user wants to track it separately using 'Add watch' command on the item.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attributeGroup ref="CommonAttributes" />
  </xs:complexType>

  <xs:complexType name="ValuePointerType">
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attribute name="Condition" type="ConditionType" use="optional" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="SizeType">
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="CommonAttributes" />
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="ArrayItemsType">
    <xs:annotation>
      <xs:documentation>Specifies an array view of the contents of a variable. It assumes data elements are contiguous in memory.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="0" maxOccurs="1" name="Direction" type="ArrayDirectionType" />
      <xs:element minOccurs="0" maxOccurs="1" name="Rank" type="StringType">
        <xs:annotation>
          <xs:documentation>Specifies the rank of the array.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element minOccurs="1" maxOccurs="unbounded" name="Size" type="SizeType">
        <xs:annotation>
          <xs:documentation>Specifies the size of each dimension of the array. For multi-dimensional arrays, you can specify an expression that uses the implicit $i parameter. The parameter will be substituted with the dimension index to find the size of the array in that dimension.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element minOccurs="0" maxOccurs="1" name="LowerBound" type="StringType">
        <xs:annotation>
          <xs:documentation>Specifies the lower bound of each dimension of the array. For multi-dimensional arrays, you can specify an expression that uses the implicit $i parameter. The parameter will be substituted with the dimension index to find the lower bound of the array in that dimension.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element minOccurs="1" maxOccurs="unbounded" name="ValuePointer" type="ValuePointerType">
        <xs:annotation>
          <xs:documentation>Specifies the expression that points to the first element of the array. The expression must be a pointer of the element type that is not void*.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="CommonAttributes" />
  </xs:complexType>

  <xs:complexType name="IndexListItemsType">
    <xs:annotation>
      <xs:documentation>Specifies a more generalized form of array view of a variable. Use when your data elements are not contiguous in memory and you need to compute index to the data elements.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="1" maxOccurs="unbounded" name="Size" type="SizeType">
        <xs:annotation>
          <xs:documentation>Specifies the size of the index list.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element minOccurs="1" maxOccurs="unbounded" name="ValueNode" type="IndexNodeType">
        <xs:annotation>
          <xs:documentation>Specifies the expression that uses the implicit $i parameter that points to the ith element.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="CommonAttributes" />
  </xs:complexType>

  <xs:complexType name="LinkedListItemsType">
    <xs:annotation>
      <xs:documentation>Specifies a linked list view of the contents of a variable.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="0" maxOccurs="unbounded" name="Size" type="SizeType">
        <xs:annotation>
          <xs:documentation>Specifies the number of elements in the linked list. If multiple size elements are specified, the first size element with a true condition (or no condition) will
          determine the size. If no size is specified (or all size elements have a false condition), the debugger will traverse the list to figure out the size. It is recommended that natvis entries
          specify a size for linked lists when possible, as providing a size will improve the performance of the debugger.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="HeadPointer" type="StringType">
        <xs:annotation>
          <xs:documentation>Expression that points to the first node of the linked list.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="NextPointer" type="StringType">
        <xs:annotation>
          <xs:documentation>Expression that points to the next element. This expression is evaluated under the context of the linked list node and not the parent linked list type.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="ValueNode" type="ListItemsNodeType">
      </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="CommonAttributes" />
  </xs:complexType>

  <xs:complexType name="TreeItemsType">
    <xs:annotation>
      <xs:documentation>Specifies a tree view of the contents of a variable.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="0" maxOccurs="1" name="Size" type="StringType">
        <xs:annotation>
          <xs:documentation>The size of the tree.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="HeadPointer" type="StringType">
        <xs:annotation>
          <xs:documentation>Expression that points to the head of the tree.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="LeftPointer" type="StringType">
        <xs:annotation>
          <xs:documentation>Expression that points to the left child of a tree node. This expression is evaluated under the context of the tree node and not the parent type.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="RightPointer" type="StringType">
        <xs:annotation>
          <xs:documentation>Expression that points to the right child of a tree node. This expression is evaluated under the context of the tree node and not the parent type.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element maxOccurs="1" name="ValueNode" type="TreeItemsNodeType">
        <xs:annotation>
          <xs:documentation>Expression that points to the value of the tree node. It can be left empty or have 'this' to refer to the tree node itself. This expression is evaluated under the context of the tree node and not the parent type.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="CommonAttributes" />
  </xs:complexType>

  <xs:complexType name="UIVisualizerItemType">
    <xs:annotation>
      <xs:documentation>Specifies a UI visualizer which can handle objects of this type. The UI visualizer must be previously defined in the natvis file.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attribute name="ServiceId" type="GuidType" use="required">
          <xs:annotation>
            <xs:documentation>The service GUID of the visualizer.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Id" type="xs:int" use="required">
          <xs:annotation>
            <xs:documentation>Specifies the visualizer id. Use to differentiate multiple viewers provided by the visualizer service.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="MostDerivedObjectType">
    <xs:annotation>
      <xs:documentation>
        Specifies an expression which evaluates to the current object, casted to its most-derived type.
        In most cases, the debugger is able to automatically determine an object's most-derived type, in which case use of the &lt;MostDerivedType&gt; element is unnecessary. Automatic determination of an object's most-derived type requires the object to be an instance of a C++ class, with a
        compiler-generated virtual function table. This is sufficient for most class-hierarchies; however, custom logic may occasionally be necessary
        when dealing with a class hierarchy that does not contain virtual functions, or when the virtual function table is manually constructed by the application code.
      </xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="CommonAttributes" />
        <xs:attribute name="IgnoreVTable" type="xs:boolean" use="optional">
          <xs:annotation>
            <xs:documentation>
              If true, indicates that the most derived type of the object will always be the static type of the provided expression. By default,
              the debugger will use vtables to calculate the most-derived type of the provided most-derived-type expressions. This option should
              be used only when the application code builds vtables using custom logic that the debugger does not understand.
            </xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:simpleType name="SmartPointerUsage">
    <xs:annotation>
      <xs:documentation>Specifies how a smart pointer may be used syntactically.</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:normalizedString">
      <xs:enumeration value="Minimal">
        <xs:annotation>
          <xs:documentation>
            Indicates that the smart pointer may be used syntactically only for the purposes of dereferencing and comparing.
            It defines the following overloaded operators:
            - operator*()    (dereference)
            - operator->()   (access field of dereferenced value)
            - operator==()   (compare with raw pointer or another smart pointer of the same type)
            - operator!=()   (compare with raw pointer or another smart pointer of the same type)
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Indexable">
        <xs:annotation>
          <xs:documentation>
            Indicates that the smart pointer may be used syntactically for the purposes of dereferencing and comparing, and indexing
            It defines the following overloaded operators:
            - operator+()  (add an offset of type size_t)
            - operator-()  (subtract an offset of type size_t)
            - operator[]   (add an offset of type size_t and dereference)
            - All of the operators supported by SmartPointerUsage=&quot;Minimal&quot;
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Full">
        <xs:annotation>
          <xs:documentation>
            Indicates that the smart pointer will contain a conversion operator to the underlying pointer. All valid uses of the underlying pointer in the language may be used through the conversion operator. Direct assignment to the smart pointer is still forbidden; in order to modify the internal pointer in an expression, you must do so explicitly.
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="SmartPointerType">
    <xs:annotation>
      <xs:documentation>
        Indicates that the given type is a smart pointer. The text inside this element specifies the expression to evaluate the underlying pointer.
        The &lt;SmartPointer&gt; element has the following effects:
          - If no alternative &lt;DisplayString&gt; element is provided (or all &lt;DisplayString&gt; elements have failed conditions), the underlying pointer will be the display string
          - If no alternative &lt;StringView&gt; element is provided (or all &lt;StringView&gt; elements have failed conditions), the underlying pointer will be the string view, if it has one.
          - If no alternative &lt;Expand&gt; element is provided, the expansion of the smart pointer will be the expansion of the underlying pointer.
          - The smart pointer class will also support overloaded operators as determined by the &lt;Usage&gt; attribute. You can opt out of this behavior by specifying
              'DefaultExpansion=&quot;false&quot;'
      </xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="StringType">
        <xs:attributeGroup ref="CommonAttributes_NoCondition" />
        <xs:attribute name="Usage" type="SmartPointerUsage" use="required">
          <xs:annotation>
            <xs:documentation>Indicates which combinations of operators this smart pointer object supports.
            </xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="DefaultExpansion" type="xs:boolean" use="optional">
          <xs:annotation>
            <xs:documentation>
              If true and no expand element is provided, a default expansion will be supplied based on the expansion of the underyling pointer. If false, no &lt;Expand&gt; element will be automatically created
              based on the smart pointer. If this attribute is not present, the default value is 'true'.
            </xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="VisualizerType">
    <xs:annotation>
      <xs:documentation>Specifies a visualizer entry which customizes the debugger view of a type.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="0" maxOccurs="unbounded" name="AlternativeType" type="AlternativeTypeType"/>
      <xs:element minOccurs="0" maxOccurs="1" name="Version" type="VersionType" />
      <xs:choice minOccurs="0" maxOccurs="1">
        <xs:sequence>
          <xs:element minOccurs="0" maxOccurs="unbounded" name="Intrinsic" type="IntrinsicType" />
          <xs:element minOccurs="0" maxOccurs="unbounded" name="MostDerivedType" type="MostDerivedObjectType" />
          <xs:element minOccurs="0" maxOccurs="unbounded" name="CustomVisualizer" type="CustomVisualizerType" />
          <xs:element minOccurs="0" maxOccurs="1" name="SmartPointer" type="SmartPointerType" />
          <xs:element minOccurs="0" maxOccurs="unbounded" name="DisplayString" type="DisplayStringType"/>
          <xs:element minOccurs="0" maxOccurs="unbounded" name="StringView" type="StringViewType"/>
          <xs:element minOccurs="0" name="Expand" type="ExpandType"/>
        </xs:sequence>
        <xs:element minOccurs="0" maxOccurs="unbounded" name="UIVisualizer" type="UIVisualizerItemType"/>
      </xs:choice>
    </xs:sequence>
    <xs:attribute name="Name" type="TypeNameType" use="required" />
    <xs:attributeGroup ref="ViewConstraints" />
    <xs:attribute name="Priority" type="PriorityType" />
    <xs:attribute name="Inheritable" type="xs:boolean" use="optional">
      <xs:annotation>
        <xs:documentation>
          True if this visualizer may be used by objects of classes derived from the given type, false if an object must be directly of this type for the visualizer to take effect.
          Default is true.
        </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:simpleType name="PriorityType">
    <xs:annotation>
      <xs:documentation>Specifies an optional priority to assign to this entry for type matching. Higher priority entries within a particular file or directory
      are checked first. &lt;Type&gt; entries that do not specify a priority receive default priority of &quot;Medium&quot;  &lt;AlternativeType&gt; entries which do not specify a priority
      will inherit the priority of the enclosing &lt;Type&gt; element. The priority is only used to disambiguate type matching when all other means of disambiguation are unavailable.
      For example, entries with more specific template instantiations, module constraints, or view constraints will take priority regardless of any priority values specified.
      Similarly, regardless of priority, natvis files that are part of a loaded project will always take precedence over files in the user natvis directory,
      which will, in turn, take precedence over files in the system-wide natvis directory.
      If two entries have the same priority and cannot otherwise be disambiguated, it is unspecified which one will get used.
      </xs:documentation>
    </xs:annotation>
    <xs:union>
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:enumeration value="Low" />
          <xs:enumeration value="MediumLow" />
          <xs:enumeration value="Medium" />
          <xs:enumeration value="MediumHigh" />
          <xs:enumeration value="High" />
        </xs:restriction>
      </xs:simpleType>
    </xs:union>
  </xs:simpleType>

  <xs:complexType name="UIVisualizerType">
    <xs:annotation>
      <xs:documentation>Specifies details of a UI visualizer which creates its own interface to display an object. Visualizer entry for a type needs to reference a UI visualizer in order to associate the type with the UI visualizer.</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attribute name="ServiceId" type="GuidType" use="required">
          <xs:annotation>
            <xs:documentation>Specifies the visualizer service GUID. The service must be provided by a Visual Studio package that also implements IVsCppDebugUIVisualizer interface. The debugger will load the package only when user requests this visualization service.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Id" type="xs:int" use="required">
          <xs:annotation>
            <xs:documentation>Specifies the visualizer id. Use to differentiate multiple viewers provided by this visualizer service.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="MenuName" type="xs:string" use="required">
          <xs:annotation>
            <xs:documentation>Specifies the name which will be shown in the UI visualizer list for a variable.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Description" type="xs:string" use="optional">
          <xs:annotation>
            <xs:documentation>Specifies the description for this UI visualizer.</xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="HResultType">
    <xs:annotation>
      <xs:documentation>Specifies a visualizer entry which customizes the debugger view of an HRESULT.</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="0" maxOccurs="unbounded" name="AlternativeHResult" type="AlternativeHResultType">
        <xs:annotation>
          <xs:documentation>Other HResult types that will share the same visualizer.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element minOccurs="1" maxOccurs="1" name="HRValue" type="StringType">
        <xs:annotation>
          <xs:documentation>32 bit HRESULT value to be customized.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element minOccurs="0" maxOccurs="1" name="HRDescription" type="StringType">
        <xs:annotation>
          <xs:documentation>The description for this HRESULT value to be shown in the debugger windows.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="Name" type="StringType" use="required">
      <xs:annotation>
        <xs:documentation>The name of the HRESULT value to be shown in the debugger windows.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="LocalizedStringType">
    <xs:annotation>
      <xs:documentation>
        Defines a localized string resource that can be referenced by natvis elements that accept strings (.g.e.g. DisplayString, Name attribute of Item element).
        Use @&lt;id&gt;; format to reference a localized string (e.g. @1001;)
      </xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attribute name="Id" use="required">
          <xs:annotation>
            <xs:documentation>The id of the localized string. Use @&lt;id&gt;; format to reference this localized string.</xs:documentation>
          </xs:annotation>
          <xs:simpleType>
            <xs:restriction base="xs:unsignedInt">
              <xs:minInclusive value="1"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="LocalizedStringsType">
    <xs:annotation>
      <xs:documentation>
        Specifies a list of localized strings that can be referenced by natvis elements. Define localized strings in a satellite natvis file with the same name as the main file
        and deploy it into a locale specific folder next to the main natvis file. Debugger will load localized resources from the appropriate satellite file.
        Define localized strings in the main natvis file to serve as defaults when there is no satellite file for a locale.
      </xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element minOccurs="1" maxOccurs="unbounded" name="LocalizedString" type="LocalizedStringType"/>
    </xs:sequence>
  </xs:complexType>

  <!-- Definition of complex elements-->

  <xs:element name="AutoVisualizer">
    <xs:annotation>
      <xs:documentation>Root element of the natvis file.</xs:documentation>
    </xs:annotation>
    <xs:complexType>
      <xs:sequence>
        <xs:element minOccurs="0" maxOccurs="1" name="Version" type="VersionType">
          <xs:annotation>
            <xs:documentation>Specifies a matching module name and version for all visualizers which do not explicitly specify a module name and version in this file.</xs:documentation>
          </xs:annotation>
        </xs:element>
        <xs:element minOccurs="0" maxOccurs="1" name="LocalizedStrings" type="LocalizedStringsType"/>
        <xs:element minOccurs="0" maxOccurs="unbounded" name="UIVisualizer" type="UIVisualizerType"/>
        <xs:choice minOccurs="0" maxOccurs="unbounded">
          <xs:element minOccurs="0" maxOccurs="unbounded" name="Type" type="VisualizerType" />
          <xs:element minOccurs="0" maxOccurs="unbounded" name="HResult" type="HResultType"/>
          <xs:element minOccurs="0" maxOccurs="unbounded" name="Intrinsic" type="IntrinsicType" />
        </xs:choice>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
```
