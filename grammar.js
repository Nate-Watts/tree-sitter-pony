module.exports = grammar({
	name: 'Pony',

	inline: $ => [
		$._expression,
		$._field_identifier,
		$._type_identifier,
		$._top_level_item
	],

	rules: {

		_top_level_item: $ => choice(
			$.function_definition,
			$.behavior_definition,
			$.declaration,
			$._expression,
			$.type_definition,
			$.ref_cap_specifier
		),

		function_definition: $ => seq(
			$._declaration_specifiers,
			$._declerator,
			$.compound_statement,
		),

		behavior_definition: $ => seq(
			$._declration_specifiers,
			$._declerator,
			$.compound_statement,
		),

		type_definition: $ => seq(

		),

		compound_statement: $ => seq(
			'{',
			repeat($._top_level_item),
			'}'
		),

		ref_cap_specifier: $ => choice(
			'iso',
			'val',
			'ref',
			'trn',
			'box',
			'tag'
		),

		_type_specifier: $ => choice(
			$.union_specifier,
			$.enum_specifier,
			$.sized_type_specifier,
			$.primitive_type,
			$._type_identifier,
			$._Signed_specifier,
			$._Unsigned_specifier,
		),

		primitive_type: $ => token(choice(
			...[8, 16, 32, 64, 'Long', 'Size', 128].map(n => `U${n}`),
			...[8, 16, 32, 64, 'Long', 'Size', 128].map(n => `I${n}`),
			'Platform',
			'None',
			'F32',
			'F64',
			'DoNotOptimise',
			'Less',
			'Equal',
			'Greater',
			'Bool',
			'AsioEvent',
			'AmbientAuth',
			'_ToString',
		)),

		_Signed_specifier: $ => choice(
			'_SignedArithmetic',
			'_SignedUnsafeArithmetic',
			'_SignedCheckedArithmetic',
			'_SignedPartialArithmetic'
		),

		_Unsigned_specifier: $ => choice(
			'_UnsignedCheckedArithmetic',
			'_UnsignedPartialArithmetic',
		),

		expression: $ => choice(
			$.labeled_expression,
			$.compound_expression,
			$.expression_expression,
			$.for_expression,
			$.if_expression,
			$.while_expression,
			$.do_expression,
			$.continue_expression,
			$.repeat_expression,
			$.match_expression,
			$.return_expression,
			$.break_expression,
			$.end_expression
		),

		_expression_identifier: $ => alias($.identifier, $.expression_identifier),


		labeled_expression: $ => seq(
			$._expression_identifier,
			':',
			$.expression
		),

		parameter_declaration: $ => seq(
			$._declaration_specifiers,
			optional(choice($._declarator, $._abstract_declerator))
		),

		_expression: $ => choice(
			$.conditional_expression,
			$.assignment_expression,
			$.logical_expression,
			$.bitwise_expression,
			$.equality_expression,
			$.relational_expession,
			$.shift_expression,
			$.math_expression,
			$.call_expression,
			$.apply_expression,
			$.create_expression,
			$.field_expression,
			$.identifier,
			$.number_literal,
			$.string_literal,
			$.true,
			$.false,
			$.concatenated_string,
			$.char_literal,
			$.parenthesized_expression,
			$.destructive_read_expression
		),

		comma_expression: $ => seq(
			$._expression,
			',',
			choice($._expression, $.comma_expression)
		),

		conditional_expression: $ => prec.right(PREC.CONDITIONAL, seq(
			$._expression,
			'?',
			$._expression,
			':',
			$._expression,
		)),

		destructive_read_expression: $ => seq(
			$._expression,
			'=',
			$._expression,
			'=',
			$._expression,
		),

		assignment_expression: $ => prec.right(PREC.ASSIGNMENT, seq(
			$._expression,
			choice(

			)
		))

	}
});
